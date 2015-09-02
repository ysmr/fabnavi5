class Attachment < ActiveRecord::Base
  belongs_to :user
  belongs_to :attachable, polymorphic: true

  scope :unattached, ->{where attachable_id: nil}
  validates :type, presence: true

  def attached?
    attachable_id.present?
  end

  class << self
    def acceptable_attributes_for_attaching
      %i(id _destroy)
    end

    def create_with_type file
      case file.type
      when /^image\//
        Attachment::Image.create file: file
      when /^video\//
        Attachment::Movie.create file: file
      else
        raise 'Unknown file type.'
      end
    end
  end
end
