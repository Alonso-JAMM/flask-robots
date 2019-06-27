from flask import Flask
import os
app = Flask(__name__)

# Try to open custom configuration for development or production environment.
# If file does not exists, then open default configuration.
# This is useful for secret key
if os.path.isfile(os.path.join(app.root_path, 'custom_config.py')):
    app.config.from_pyfile('custom_config.py')
else:
    app.config.from_pyfile('default_config.py')

# Need to be imported after configuration
from robots.views import bot, home  # from robots import views
from robots import custom_cli

app.register_blueprint(bot.bot_1)
app.register_blueprint(home.home)
