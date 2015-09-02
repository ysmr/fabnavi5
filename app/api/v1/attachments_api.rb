class V1::AttachmentsAPI < V1::BaseAPI
  resource :attachments do
    desc 'Upload a file', {headers: AUTH_HEADERS}
    params do
      requires :attachment, type: Hash do
        requires :file, type: Rack::Multipart::UploadedFile
      end
    end
    post do
      authenticate_user!
      att = current_user.attachments.create_with_type params[:attachment][:file]
      att.to_json
    end
  end
end
