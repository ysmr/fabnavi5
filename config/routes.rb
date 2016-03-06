Rails.application.routes.draw do
  root "home#show"
  namespace :api do
    mount_devise_token_auth_for 'User', at: '/v1/auth'
    mount API => '/'
    if Rails.env.development?
      mount GrapeSwaggerRails::Engine => '/v1/swagger'
    end
  end
end
