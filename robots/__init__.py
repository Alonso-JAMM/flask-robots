from flask import Flask
import os


# Use a factory for making better tests
def create_app():
    app = Flask(__name__)
    # app.config.from_pyfile(config_file)

    # Try to open custom configuration for development or production environment.
    # If file does not exists, then open default configuration.
    # This is useful for secret key
    if os.path.isfile(os.path.join(app.root_path, 'custom_config.py')):
        with app.app_context():
            app.config.from_pyfile('custom_config.py')
    else:
        with app.app_context():
            app.config.from_pyfile('default_config.py')

    # Need to be imported after configuration
    from robots.views import bot, home  # from robots import views
    app.register_blueprint(bot.bot_1)
    app.register_blueprint(home.home)


    with app.app_context():
        from robots import custom_cli

    return app


