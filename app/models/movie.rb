class Movie < Content
  include Attachable

  mount_uploader :movie_file, MovieUploader

  class << self
    def acceptable_attributes
      super + %i(attachable_id)
    end
  end
end
