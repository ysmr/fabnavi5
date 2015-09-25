json.extract! figure, :id, :position
if figure.attached?
  json.attachment do
    json.id figure.attachment.id
    json.file figure.attachment.file.url
  end
end
