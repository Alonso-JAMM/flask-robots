import sys, os

base_directory = os.path.dirname(__file__)

activate_this = os.path.join(base_directory, 'venv/bin/activate_this.py')

#activate_this = '/var/www/flask-robots/venv/bin/activate_this.py'
with open(activate_this) as file_:
        exec(file_.read(), dict(__file__=activate_this))

from robots import app as application