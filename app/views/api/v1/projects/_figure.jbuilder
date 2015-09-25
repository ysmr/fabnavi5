json.extract! figure, :id, :position
if figure.attached?
  json.attachment do
    json.id figure.attachment.id
    json.file do
      json.original figure.attachment.file.url
      json.thumb figure.attachment.file.thumb.url
    end
  end
end
