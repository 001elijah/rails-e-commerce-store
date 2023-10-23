class SessionsController < ApplicationController
    def create
        @user = ReactUser
                        .find_by(email: params["user"]["email"])
                        # .try(:authenticate, params["user"]["password"])
        if @user
            session[:user_id] = @user.id
            render json: {
                status: :created,
                logged_in: true,
                user: @user
            }
        else
            render json: {
                status: 401
            }
        end
    end

    def logged_in
        if session[:user_id]
            @current_react_user = ReactUser.find(session[:user_id])

            if @current_react_user
                render json: {
                    logged_in: true,
                    user: @current_react_user
                }
            else
                render json: {
                    logged_in: false
                }
            end
        end
    end

    def logout
        reset_session
        render json: {
            status: 200,
            logged_out: true
        }
    end
end