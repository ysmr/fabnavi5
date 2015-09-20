class BaseUploader < CarrierWave::Uploader::Base
  storage (Rails.env.production? ? :fog : :file)
end
