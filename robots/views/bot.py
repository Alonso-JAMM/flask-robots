from robots import helpers, wrappers
from flask import Blueprint, render_template


bot_1 = Blueprint('bot', __name__)


@bot_1.route('/controller')
@wrappers.login_required
def controller():
    name = 'controller'
    return render_template('bot/controller.html', projects=helpers.get_projects(), name=name)


@bot_1.route('/streamer')
@wrappers.login_required
def streamer():
    name = 'streamer'
    return render_template('bot/streamer.html', projects=helpers.get_projects(), name=name)

