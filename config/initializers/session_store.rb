if Rails.env == "production"
    Rails.application.config.session_store :cookie_store, key: "_authentication_app", domain: "001elijah.github.io"
else
    Rails.application.config.session_store :cookie_store, key: "_authentication_app"
end