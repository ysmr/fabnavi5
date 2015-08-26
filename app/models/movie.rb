class Movie < Content
  mount_uploader :movie_file, MovieUploader
end
