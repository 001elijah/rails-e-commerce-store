class ReactUser < ApplicationRecord
    has_many :react_orders
    has_secure_password

    validates_presence_of :email
    validates_uniqueness_of :email
end
