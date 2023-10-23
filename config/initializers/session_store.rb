if Rails.env == "production"
    Rails.application.config.session_store :cookie_store, key: "_rails_e_commerce_store", domain: "rails-e-ecommerce-store.onrender.com", secure: Rails.env.production?
else
    Rails.application.config.session_store :cookie_store, key: "_rails_e_commerce_store"
end