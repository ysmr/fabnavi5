if @attachment.errors.any?
  json.errors @attachment.errors
else
  json.partial! 'v1/attachments/attachment', attachment: @attachment
end
