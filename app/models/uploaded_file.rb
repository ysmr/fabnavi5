class UploadedFile < ActiveRecord::Base
  mount_uploader :file, FileUploader
end
