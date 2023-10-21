class AddMoreDataToReactUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :react_users, :first_name, :string
    add_column :react_users, :last_name, :string
    add_column :react_users, :role, :string
  end
end
