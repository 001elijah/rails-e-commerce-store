class CreateReactOrderItems < ActiveRecord::Migration[7.1]
  def change
    create_table :react_order_items do |t|
      t.belongs_to :react_order, null: false, foreign_key: true
      t.belongs_to :item, null: false, foreign_key: true
      t.integer :quantity

      t.timestamps
    end
  end
end
