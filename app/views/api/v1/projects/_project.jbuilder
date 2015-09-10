json.extract! project, :name, :description
if project.lisenced?
  json.lisence do
    json.partial! 'v1/projects/lisence', lisence: project.lisence
  end
end
