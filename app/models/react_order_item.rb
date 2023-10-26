class ReactOrderItem < ApplicationRecord
  belongs_to :react_order
  belongs_to :item
end
