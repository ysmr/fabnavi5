class Figure < ActiveRecord::Base
  include Attachable

  belongs_to :content

  class << self
    def acceptable_attributes
      %i(_destroy attachment_id)
    end
  end
end
