module CurrentUserConcern
    extend ActiveSupport::Concern

    included do
        before_action :set_current_react_user
    end

    def set_current_react_user
        if session[:user_id]
            @current_react_user = ReactUser.find(session[:user_id])
        end
    end
end