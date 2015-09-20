json.array! content.figures do |figure|
  json.figure do
    if figure.attached?
      json.position figure.position
      json.extract! figure.attachment, :id, :file
    end
  end
end
