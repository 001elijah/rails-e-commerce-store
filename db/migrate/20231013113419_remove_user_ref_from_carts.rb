class RemoveUserRefFromCarts < ActiveRecord::Migration[7.1]
  def change
    remove_reference :carts, :user, null: false, foreign_key: true
  end
end
