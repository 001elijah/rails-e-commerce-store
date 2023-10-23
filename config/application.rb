require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RailsECommerceStore
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w(assets tasks))

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    # 
    # Specify cookies SameSite protection level: either :none, :lax, or :strict.
    # This change is not backwards compatible with earlier Rails versions. 
    # It's best enabled when your entire app is migrated and stable on 6.1.
    # Was not in Rails 6.0. Default in rails 6.1 is :lax, not :strict
    config.action_dispatch.cookies_same_site_protection = :none
  end
end
