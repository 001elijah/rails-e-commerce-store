if Rails.env == "production"
    Rails.application.config.session_store :cookie_store, key: "_authentication_app", domain: "https://001elijah.github.io/rails-e-commerce-store"
else
    Rails.application.config.session_store :cookie_store, key: "_authentication_app"
end