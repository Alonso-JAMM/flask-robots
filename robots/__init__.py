from flask import Flask
import os
app = Flask(__name__)

""" NEED TO ADD A BETTER KEY! """
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'robots.db'),
    SECRET_KEY='development key',
))


# from robots import views
from robots.views import bot, home

from robots import custom_cli


app.register_blueprint(bot.bot_1)
app.register_blueprint(home.home)
