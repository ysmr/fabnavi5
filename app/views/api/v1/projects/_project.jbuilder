json.extract! project, :name, :description
json.lisence do
  json.partial! 'v1/projects/lisence', lisence: project.lisence
end
