json.extract! react_order, :id, :react_user_id, :amount, :created_at, :updated_at
json.url react_order_url(react_order, format: :json)
