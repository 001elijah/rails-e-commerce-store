class RegistrationsController < ApplicationController
    def create
        @user = ReactUser.create!(
            role: params["user"]["role"],
            email: params["user"]["email"],
            first_name: params["user"]["first_name"],
            last_name: params["user"]["last_name"],
            password: params["user"]["password"],
            password_confirmation: params["user"]["password_confirmation"],
        )
        if @user
            session[:user_id] = @user.id
            render json: {
                status: :created,
                user: @user
            }
        else
            render json: {
                status: 500
            }
        end
    end

end