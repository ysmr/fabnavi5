class Attachment::Movie < Attachment
  mount_uploader :file, MovieUploader
end
