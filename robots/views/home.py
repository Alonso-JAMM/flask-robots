from robots import helpers, wrappers
from flask import Blueprint, session, render_template, redirect, url_for, request, flash

home = Blueprint('home', __name__)


@home.route('/')
@wrappers.login_required
def index():
    name = 'home'
    return render_template('home/index.html', projects=helpers.get_projects(), name=name)


@home.route('/login', methods=['GET', 'POST'])
def login():
    # flash could be use instead of variable error, but at the end it's the same result
    error = None
    name = 'login'

    if session.get('logged_in'):
        return redirect(url_for('home.index'))

    if request.method == 'POST':
        user = request.form.get('username')
        password = request.form.get('password')
        userdb = helpers.get_user_data(user)

        if userdb is not None and password == userdb['password']:
            session['logged_in'] = True
            session['username'] = user
            return redirect(url_for('home.index'))
        else:
            error = "Invalid username or password"

    return render_template('home/login.html', error=error, name=name)


@home.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('home.login'))

