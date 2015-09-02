class Movie < Content
  class << self
    def acceptable_attributes
      super + %i(attachable_id)
    end
  end
end
