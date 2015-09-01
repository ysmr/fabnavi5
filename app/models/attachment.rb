class Attachment < ActiveRecord::Base
  mount_uploader :file, FileUploader

  belongs_to :attachable, polymorphic: true

  scope :unattached, ->{where attachable_id: nil}

  def attached?
    attachable_id.present?
  end

  class << self
    def acceptable_attributes_for_attaching
      %i(id _destroy)
    end
  end
end
