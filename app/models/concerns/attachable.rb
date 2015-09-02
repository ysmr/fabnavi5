module Attachable
  extend ActiveSupport::Concern
  included do
    attr_accessor :attachment_id

    has_one :attachment, as: :attachable, dependent: :destroy

    accepts_nested_attributes_for :attachment, allow_destroy: true
  end

  def to_be_attached?
    attachment_id.present?
  end

  def attach!
    return unless attachment_id
    if att = current_user.attachments.unattached.find_by(id: attachment_id)
      self.attachment = att
    end
  end
end
