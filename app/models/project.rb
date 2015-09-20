class Project < ActiveRecord::Base
  acts_as_taggable
  acts_as_votable

  mount_uploader :image, ImageUploader

  belongs_to :user
  belongs_to :lisence
  has_one :content, dependent: :destroy

  validates :name, presence: true, length: {maximum: 64}, uniqueness: {scope: :user_id}
  validates :description, length: {maximum: 512}

  accepts_nested_attributes_for :content

  after_commit :link_attachments!, on: :update

  scope :public_projects, ->{where private: false}
  scope :showable_for, ->user{where "projects.private = 0 or projects.user_id = ?", user.id}

  def link_attachments!
    content.attach! attachment_owner: user if content.to_be_attached?
    content.figures.each do |figure|
      figure.attach! attachment_owner: user if figure.to_be_attached?
    end
  end

  def lisenced?
    lisence.present?
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
