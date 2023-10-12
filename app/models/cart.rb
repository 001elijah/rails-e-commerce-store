class Cart < ApplicationRecord
    has_many :orderables
    has_many :items, through: :orderables

    def total
        orderables.to_a.sum { |orderable| orderable.total }
    end
end
