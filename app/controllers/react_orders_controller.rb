class ReactOrdersController < ApplicationController
    include CurrentUserConcern

    def index
        @react_orders = ReactOrder.all
    end
    
    # def react_orders
    #     react_orders = ReactOrder.all

    #     if react_orders
    #         response json: {
    #             orders: react_orders
    #         }
    #     else
    #         response json: {
    #             status: 404
    #         }
    #     end
    # end

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