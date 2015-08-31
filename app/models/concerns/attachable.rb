module Attachable
  extend ActiveSupport::Concern
  included do
    attr_accessor :attachment_id

    has_one :attachment, as: :attachable, dependent: :destroy

    before_save :attach

    accepts_nested_attributes_for :attachment, allow_destroy: true
  end

  private
  def attach
    if att = Attachment.unattached.find_by(attachable_id: id)
      self.attachment = att
    end
  end
end
