class API < Grape::API
  format :json
  mount V1 => '/v1'
end
