class Project < ActiveRecord::Base
  acts_as_taggable
  acts_as_votable

  belongs_to :user
  has_one :content, dependent: :destroy

  accepts_nested_attributes_for :content

  class << self
    def acceptable_attributes
      %i(tag_list name description) + [content_attributes: Content.acceptable_attributes]
    end
  end
end
