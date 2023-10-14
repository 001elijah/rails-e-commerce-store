class Cart < ApplicationRecord
    has_many :orderables, dependent: :destroy
    has_many :items, through: :orderables

    def total
        orderables.to_a.sum { |orderable| orderable.total }
    end
end
