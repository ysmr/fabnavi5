class Calibration < ActiveRecord::Base
  belongs_to :user
  validates :name, uniqueness: {scope: [:user_id]}

  class << self
    def acceptable_attributes
      %i(name x y width height)
    end
  end
end
