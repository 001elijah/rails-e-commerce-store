class ReactOrdersController < ApplicationController
    include CurrentUserConcern

    def index
        sql = 'SELECT * FROM "react_orders" INNER JOIN "react_users" ON "react_orders"."react_user_id" = "react_users"."id";'
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