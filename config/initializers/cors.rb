Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins 'https://afd9-91-90-11-229.ngrok-free.app'
        resource '*',
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
end