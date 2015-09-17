json.extract! project, :id, :name, :description
if project.lisenced?
  json.lisence do
    json.partial! 'v1/projects/lisence', lisence: project.lisence
  end
end
json.user do
  json.partial! 'v1/projects/user', user: project.user
end

json.content do
  json.partial! 'v1/projects/content', content: project.content
end
