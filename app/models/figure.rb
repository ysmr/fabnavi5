class Figure < ActiveRecord::Base
  include Attachable

  belongs_to :content

  validates :type, presence: true
  validate :validate_parent_model

  private
  def validate_parent_model
    raise NotImprementedError, 'Use inherited classes.'
  end

  class << self
    def acceptable_attributes
      %i(_destroy id type attachment_id)
    end
  end
end
