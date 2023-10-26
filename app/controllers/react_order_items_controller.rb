class ReactOrderItemsController < ApplicationController
    def show
        sql = "SELECT * FROM react_order_items INNER JOIN react_orders ON react_order_items.react_order_id = react_orders.id INNER JOIN items ON react_order_items.item_id = items.id WHERE react_order_id = #{params[:id]};"
        react_order_items = ActiveRecord::Base.connection.execute(sql)

        if react_order_items.count > 0
            render json: {
                status: 200,
                items: react_order_items
            }
        else
            render json: {
                status: 404
            }
        end
    end

    def create
        items_array = Array.new
        params["items"].each do |item|
            @react_order_item = ReactOrderItem.create!(
                react_order_id: item["react_order_id"],
                item_id: item["item_id"],
                quantity: item["quantity"]
            )
            items_array.push(@react_order_item)
        end
        if items_array
            render json: {
                items: items_array,
                status: 200
            }
            else
            render json: {
                status: 500
            }
        end
    end
end
