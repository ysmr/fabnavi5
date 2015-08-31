class Content < ActiveRecord::Base
  belongs_to :project
  has_many :figures

  accepts_nested_attributes_for :figures, allow_destroy: :true

  class << self
    def acceptable_attributes
      %i(type description _destroy) + [figures_attributes: Figure.acceptable_attributes]
    end
  end
end
