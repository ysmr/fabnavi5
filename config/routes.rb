Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    # mount_devise_token_auth_for 'User', at: '/v1/auth'
    mount API => '/'
  end
end
