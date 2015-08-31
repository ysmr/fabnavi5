module Attachable
  extend ActiveSupport::Concern
  included do
    attr_accessor :attachment_id

    has_one :attachment, as: :attachable

    before_save :attach

    accepts_nested_attributes_for :attachment, allow_destroy: true
  end

  private
  def attach
    if attachment_id.present?
      self.attachment = Attachment.unattached.find attachment_id
    end
  end
end
