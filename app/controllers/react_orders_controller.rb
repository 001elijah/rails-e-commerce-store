class ReactOrdersController < ApplicationController
    include CurrentUserConcern

    def index
        sql = 'SELECT * FROM "react_users" INNER JOIN "react_orders" ON "react_users"."id" = "react_orders"."react_user_id";'
        react_orders = ActiveRecord::Base.connection.execute(sql)

        if react_orders
            render json: {
                status: 200,
                orders: react_orders
            }
        else
            render json: {
                status: 404
            }
        end
    end

    def create
        @react_order = @current_react_user.react_orders.create!(
            react_user_id: params["user_id"],
            amount: params["amount"]
        )

        if @react_order

            # adding user's first_name to the existing object before response
            @react_order = @react_order.attributes
            
            if @current_react_user
                @react_order["first_name"] = @current_react_user.first_name
            end

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