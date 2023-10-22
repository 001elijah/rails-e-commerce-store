class ReactUsersController < ApplicationController
  def index
    @react_users = ReactUser.all
  end
end
