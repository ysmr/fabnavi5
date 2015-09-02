class Figure < ActiveRecord::Base
  include Attachable

  belongs_to :content

  #before_save :set_type

  private
  def set_type
    content.type
  end

  class << self
    def acceptable_attributes
      %i(_destroy id attachment_id)
    end
  end
end
