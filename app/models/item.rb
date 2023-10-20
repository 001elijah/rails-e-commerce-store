class Item < ApplicationRecord
    has_many :orderables, dependent: :destroy
    has_many :carts, through: :orderables
end
