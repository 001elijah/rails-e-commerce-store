Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins 'http://localhost:3000'
        resource '*',
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
    end

    allow do
        origins 'http://localhost:5173'
        resource '*',
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
    end

    allow do
        origins 'https://rails-e-ecommerce-store.onrender.com'
        resource '*',
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
    end

    allow do
        origins 'http://0.0.0.0:10000'
        resource '*',
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
    end
end