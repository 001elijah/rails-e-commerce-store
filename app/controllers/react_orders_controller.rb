class ReactOrdersController < ApplicationController
    def index
        @react_orders = ReactOrder.all
    end

    def create
        if session[:user_id]
                @current_react_user = ReactUser.find(session[:user_id])

                @react_order = @current_react_user.react_orders.create!(
                react_user_id: params["user_id"],
                amount: params["amount"]
                )

                if @react_order
                    render json: {
                        status: :created,
                        order: @react_order
                    }
                else
                    render json: {
                        status: 500
                    }
                end
            end
        end
    end