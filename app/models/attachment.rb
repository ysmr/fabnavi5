class Attachment < ActiveRecord::Base
  mount_uploader :file, FileUploader

  belongs_to :attachable, polymorphic: true, dependent: :destroy

  scope :unattached, ->{where attachable_id: nil}

  def attached?
    attachable_id.present?
  end

  class << self
    def acceptable_attributes
      %i(_destroy)
    end
  end
end
