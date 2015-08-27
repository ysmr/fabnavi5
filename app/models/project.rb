class Project < ActiveRecord::Base
  belongs_to :user
  has_one :content

  acts_as_taggable
  acts_as_votable

  accepts_nested_attributes_for :content

  class << self
    def acceptable_attributes
      %i(tag_list name) + [content_attributes: Content.acceptable_attributes]
    end
  end
end
