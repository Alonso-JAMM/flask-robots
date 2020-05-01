import os
#from flask import current_app

dir_path = os.path.dirname(os.path.realpath(__file__))
# Default Configuration
DATABASE = os.path.join(dir_path, "robots.db") # .path.join(current_app.root_path, 'robots.db')
SECRET_KEY = 'hkghdefault key'

