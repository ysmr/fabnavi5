class V1::Projects < V1::Base
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
    get jbuilder: 'v1/projects/index' do
      @projects = Project.order(id: :desc).page(params[:page])
    end

    desc 'Create a project', {headers: AUTH_HEADERS}
    params do
      requires :project, type: Hash do
        optional :name, type: String
        requires :content_attributes, type: Hash do
          requires :type, type: String
        end
      end
    end
    post jbuilder: 'v1/projects/create' do
      authenticate_user!
      @project = current_user.projects.build project_params_for_create
      if @project.save
        status 201
      else
        status 400
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
      patch jbuilder: 'v1/projects/update' do
        authenticate_user!
        @project = current_user.projects.find(params[:id])
        if params[:project][:content_attributes]
          params[:project][:content_attributes][:id] = @project.content.id
        end
        if @project.update project_params_for_update
          status 200
        else
          status 400
        end
      end

      desc 'Delete a project', {headers: AUTH_HEADERS}
      delete do
        authenticate_user!
        proj = current_user.projects.find(params[:id])
        proj.destroy
        body false
      end

      desc 'Like a project', {headers: AUTH_HEADERS}
      patch 'like' do
        authenticate_user!
        proj = current_user.projects.find(params[:id])
        proj.liked_by current_user
        body false
      end

      desc 'Unlike a project', {headers: AUTH_HEADERS}
      patch 'unlike' do
        authenticate_user!
        proj = current_user.projects.find(params[:id])
        proj.unliked_by current_user
        body false
      end
    end
  end
end
