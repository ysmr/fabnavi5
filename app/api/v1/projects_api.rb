class V1::ProjectsAPI < V1::BaseAPI
  helpers do
    def project_params_for_create
      ActionController::Parameters.new(params)
        .require(:project).permit *(Project.acceptable_attributes_for_create)
    end

    def project_params_for_update
      ActionController::Parameters.new(params)
        .require(:project).permit *(Project.acceptable_attributes_for_update)
    end
  end

  resource :projects do
    desc 'Get all projects'
    get do
      Project.order(id: :desc).page(params[:page])
    end

    desc 'Create a project', {headers: AUTH_HEADERS}
    params do
      requires :project, type: Hash do
        requires :name, type: String
        requires :content_attributes, type: Hash do
          requires :type, type: String
        end
      end
    end
    post do
      authenticate_user!
      proj = current_user.projects.build project_params_for_create
      if proj.save
        proj.to_json
      else
        {error: proj.errors}
      end
    end

    resource ':id' do
      desc 'Update a project', {headers: AUTH_HEADERS}
      params do
        requires :project, type: Hash do
          optional :name, type: String
          optional :description, type: String
          optional :tag_list, type: String
          optional :attachment_id, type: Integer
          optional :content_attributes, type: Hash do
            optional :description, type: String
            optional :attachment_id, type: Integer
            optional :figures_attributes, type: Array do
              optional :id, type: Integer
              optional :type, type: String
              optional :_destroy, type: Boolean
              optional :attachment_id, type: Integer
            end
          end
        end
      end
      patch do
        authenticate_user!
        proj = current_user.projects.find(params[:id])
        if params[:project][:content_attributes]
          params[:project][:content_attributes][:id] = proj.content.id
        end
        if proj.update project_params_for_update
          proj.to_json
        else
          {error: proj.errors}
        end
      end

      desc 'Delete a project', {headers: AUTH_HEADERS}
      delete do
        authenticate_user!
        proj = current_user.projects.find(params[:id])
        proj.destroy
        {}
      end

      desc 'Like a project', {headers: AUTH_HEADERS}
      patch 'like' do
        authenticate_user!
        proj = current_user.projects.find(params[:id])
        proj.liked_by current_user
        {}
      end

      desc 'Unlike a project', {headers: AUTH_HEADERS}
      patch 'unlike' do
        authenticate_user!
        proj = current_user.projects.find(params[:id])
        proj.unliked_by current_user
        {}
      end
    end
  end
end
