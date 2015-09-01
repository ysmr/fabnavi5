class Project < ActiveRecord::Base
  acts_as_taggable
  acts_as_votable
  attr_accessor :content_type

  belongs_to :user
  has_one :content, dependent: :destroy
  validates :content_type, on: :create, inclusion: [PhotoList.name, Movie.name]

  accepts_nested_attributes_for :content

  before_create :build_content_with_type
  after_commit :attach!, on: :update

  def attach!
    content.attach! if content.to_be_attached?
    content.figures.each do |figure|
      figure.attach! if figure.to_be_attached?
    end
  end

  private
  def build_content_with_type
    content = build_content
    case content_type
    when PhotoList.name
      content.type = PhotoList.name
    when Movie.name
      content.type = Movie.name
    else
      raise 'Unknown content type.'
    end
  end

  class << self
    def acceptable_attributes_for_create
      %i(name description content_type)
    end

    def acceptable_attributes_for_update
      %i(tag_list name description) + [content_attributes: Content.acceptable_attributes]
    end
  end
end
