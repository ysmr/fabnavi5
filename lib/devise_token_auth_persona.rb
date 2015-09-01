module DeviseTokenAuth::Persona
  extend ActiveSupport::Concern
  included do
    mattr_accessor :persona_verification_server, :persona_verification_path, :persona_audience_url
    self.persona_verification_server = 'verifier.login.persona.org'
    self.persona_verification_path = '/verify'
    self.persona_audience_url = 'http://www.example.com'
  end
end
DeviseTokenAuth.include DeviseTokenAuth::Persona

DeviseTokenAuth::SessionsController.class_eval do
  def create
    # Check
    field = (resource_params.keys.map(&:to_sym) & resource_class.authentication_keys).first

    @resource = nil
    email, _ = verify resource_params[field], DeviseTokenAuth.persona_audience_url
    password = SecureRandom.base64 30
    unless @resource = User.find_by(email: email)
      @resource = User.create email: email, password: password, password_confirmation: password
    end

    if @resource
      # create client id
      @client_id = SecureRandom.urlsafe_base64(nil, false)
      @token     = SecureRandom.urlsafe_base64(nil, false)

      @resource.tokens[@client_id] = {
        token: BCrypt::Password.create(@token),
        expiry: (Time.now + DeviseTokenAuth.token_lifespan).to_i
      }
      @resource.save

      sign_in(:user, @resource, store: false, bypass: false)

      yield if block_given?

      render json: {
        data: @resource.token_validation_response
      }
    else
      render json: {
        errors: [I18n.t("devise_token_auth.sessions.bad_credentials")]
      }, status: 401
    end
  end

  private
  def verify(assertion, audience)
    http = Net::HTTP.new(DeviseTokenAuth.persona_verification_server, 443)
    http.use_ssl = true

    verification = Net::HTTP::Post.new(DeviseTokenAuth.persona_verification_path)
    verification.set_form_data(assertion: assertion, audience: audience)

    response = http.request(verification)
    raise "Unsuccessful response from #{DeviseTokenAuth.persona_verification_server}: #{response}" unless response.kind_of? Net::HTTPSuccess
    authentication = JSON.parse(response.body)

    # Authentication response is a JSON hash which must contain a 'status'
    # of "okay" or "failure".
    status = authentication['status']
    raise "Unknown authentication status '#{status}'" unless %w{okay failure}.include? status

    # An unsuccessful authentication response should contain a reason string.
    raise "Assertion failure: #{authentication['reason']}" unless status == "okay"

    # A successful response looks like the following:
    # {
    #   "status": "okay",
    #   "email": "user@example.com",
    #   "audience": "https://service.example.com:443",
    #   "expires": 1234567890,
    #   "issuer": "persona.mozilla.com"
    # }

    auth_audience = authentication['audience']
    raise "Persona assertion audience '#{auth_audience}' does not match verifier audience '#{audience}'" unless auth_audience == audience

    expires = authentication['expires'] && Time.at(authentication['expires'].to_i/1000.0)
    raise "Persona assertion expired at #{expires}" if expires && expires < Time.now

    [authentication['email'], authentication['issuer']]
  end
end
