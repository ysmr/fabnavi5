class Content < ActiveRecord::Base
  belongs_to :project
  has_many :figures

  accepts_nested_attributes_for :figures

  class << self
    def acceptable_attributes
      %i(movie) + [figures_attributes: Figure.acceptable_attributes]
    end
  end
end
