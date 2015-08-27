class Figure < ActiveRecord::Base
  belongs_to :content

  class << self
    def acceptable_attributes
      %i(image)
    end
  end
end
