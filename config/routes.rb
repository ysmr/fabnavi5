Rails.application.routes.draw do
  root "home#show"
  namespace :api do
    mount_devise_token_auth_for 'User', at: '/v1/auth'
    mount API => '/'
    mount GrapeSwaggerRails::Engine => '/v1/swagger'
  end
end
