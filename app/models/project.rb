class Project < ActiveRecord::Base
  include Attachable

  acts_as_taggable
  acts_as_votable

  belongs_to :user
  belongs_to :lisence
  has_one :content, dependent: :destroy

  validates :name, presence: true

  accepts_nested_attributes_for :content

  after_commit :link_attachments!, on: :update

  def link_attachments!
    attach! attachment_owner: user if to_be_attached?
    content.attach! attachment_owner: user if content.to_be_attached?
    content.figures.each do |figure|
      figure.attach! attachment_owner: user if figure.to_be_attached?
    end
  end

  private
  class << self
    def acceptable_attributes_for_create
      %i(name content_attributes) + [content_attributes: Content.acceptable_attributes_for_create]
    end

    def acceptable_attributes_for_update
      %i(tag_list name description attachment_id lisence_id) + [content_attributes: Content.acceptable_attributes_for_update]
    end
  end
end
