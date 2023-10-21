class ApplicationController < ActionController::Base
    # Prevent CSRF attacks by raising an exception.
    # For APIs, you may want to use :null_session instead.
    protect_from_forgery with: :exception

    # skip rails csrf token check, because this process is done in frontend app
    skip_before_action :verify_authenticity_token
    
    before_action :configure_permitted_parameters, if: :devise_controller?
    before_action :set_render_cart
    before_action :initialize_cart

    def set_render_cart
        @render_cart = true
    end

    def initialize_cart
        @cart ||= Cart.find_by(id: session[:cart_id])

        if @cart.nil?
            @cart = Cart.create
            session[:cart_id] = @cart.id
        end
    end

    def about
        @render_cart = false
    end

    before_action :set_render_order
    
    def set_render_order
        @render_order = true
    end

    protected

        def configure_permitted_parameters
            devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:role, :first_name, :last_name, :email, :password) }
            devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:first_name, :last_name, :email, :password, :current_password) }
            devise_parameter_sanitizer.permit(:item_path) { |u| u.permit(:name, :description, :price) }
        end
end
