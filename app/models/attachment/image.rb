class Attachment::Image < Attachment
  mount_uploader :file, ImageUploader
end
