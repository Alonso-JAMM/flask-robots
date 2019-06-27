import os
from robots import app

# Default Configuration
DATABASE = os.path.join(app.root_path, 'robots.db')
SECRET_KEY = 'default key'

