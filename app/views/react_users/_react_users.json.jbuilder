json.extract! react_user, :id, :first_name, :last_name, :email, :created_at, :updated_at, :password_digest, :role
json.url react_user_url(react_user, format: :json)