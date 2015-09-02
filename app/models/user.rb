class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  include DeviseTokenAuth::Concerns::User

  has_many :projects, dependent: :destroy

  class << self
    def authentication_keys
      %i(assertion)
    end
  end
end
