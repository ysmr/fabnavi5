class Content < ActiveRecord::Base
  include Attachable

  belongs_to :project
  has_many :figures

  accepts_nested_attributes_for :figures, allow_destroy: :true

  class << self
    def acceptable_attributes
      %i(id description attachment_id) + [figures_attributes: Figure.acceptable_attributes]
    end
  end
end
