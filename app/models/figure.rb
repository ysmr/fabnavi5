class Figure < ActiveRecord::Base
  include Attachable
  acts_as_list scope: :content

  belongs_to :content

  validates :type, presence: true
  validate :validate_parent_model

  private
  def validate_parent_model
    raise NotImprementedError, 'Use inherited classes.'
  end

  class << self
    def acceptable_attributes
      %i(_destroy id type attachment_id position)
    end
  end
end
