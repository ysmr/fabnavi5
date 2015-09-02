if @project.errors.any?
  json.errors @project.errors
else
  json.partial! 'v1/projects/project', project: @project
end
