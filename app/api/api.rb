class API < Grape::API
  format :json
  formatter :json, Grape::Formatter::Jbuilder
  mount V1 => '/v1'
end
