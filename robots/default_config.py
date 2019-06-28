import os
from flask import current_app

# Default Configuration
DATABASE = os.path.join(current_app.root_path, 'robots.db')
SECRET_KEY = 'default key'

