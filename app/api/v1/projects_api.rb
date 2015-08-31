class V1::ProjectsAPI < V1::BaseAPI
  helpers do
    def project_params
      ActionController::Parameters.new(params)
        .require(:project).permit *(Project.acceptable_attributes)
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
        requires :description, type: String
      end
    end
    post do
      authenticate_user!
      proj = Project.create project_params
      proj.to_json
    end

    resource ':id' do
      desc 'Update a project', {headers: AUTH_HEADERS}
      params do
        requires :project, type: Hash do
          requires :name, type: String
          requires :description, type: String
          optional :tag_list, type: String
          optional :content_attribute, type: Hash do
            requires :type, type: String
            requires :description, type: String
            optional :attachment_id, type: Integer
            optional :_destroy, type: Boolean
            optional :figures_attributes, type: Hash do
              requires :type, type: String
              optional :_destroy, type: Boolean
            end
          end
        end
      end
      patch do
        proj = Project.find(params[:id])
        proj.update project_params
        proj.to_json
      end

      desc 'Delete a project', {headers: AUTH_HEADERS}
      delete do
        proj = Project.find(params[:id])
        proj.destroy
        {}
      end

      desc 'Like a project', {headers: AUTH_HEADERS}
      patch 'like' do
        authenticate_user!
        proj = Project.find(params[:id])
        proj.liked_by current_user
        {}
      end

      desc 'Unlike a project', {headers: AUTH_HEADERS}
      patch 'unlike' do
        authenticate_user!
        proj = Project.find(params[:id])
        proj.unliked_by current_user
        {}
      end
    end
  end
end
