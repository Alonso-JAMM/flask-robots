# flask-robots
This small website is the host of my other projects

## Installation
1. Clone the project
```
  git clone https://github.com/ClassicKerobel/flask-robots.git
```
2. Move to the project root directory and run **install.sh.**

    It will create a virtualenv in the directory and install the required libraries to run the website (Flask).
   - **If the script does not work**
   
     - Create a virtualenv called venv in the root directory of the project
     ```
      virtualenv -p python3 venv
     ```
     - Then activate the virtual env
     ```
      . venv/bin/activate
     ```
     - Then install the required libraries
     ```
      pip install -e .
     ```
     - Move to the robots directory and create a database named **robots.db**
     ```
      cd robots/
      
      touch robots.db
     ```
     - Create all the tables and default projects and users from the **schema.sql** file
     ```
      sqlite3 robots.db < schema.sql
     ```
3. In the file **robots/templates/macros.html** change value of **URL** in the macro **bot_host** to 
the url that is used to host the easyrtc server that controls the bot. Not use quotation marks, they are 
needed. Example:
```
  http://example.com
```

4. **Secure Key** you can generate it and put it in **SECRET_KEY** in **robots/custom_config.py**. The key is used to 
encrypt cookies that are used in sessions. You can generate the key by enteryng in the terminal and run python. 
Then do this:
```
  >>> import os
  >>> os.urandom(24)
  '\xfd{H\xe5<\x95\xf9\xe3\x96.5\xd1\x01O<!\xd5\xa2\xa0\x9fR"\xa1\xa8'
```

   I took it from the flask [documentation](http://flask.pocoo.org/docs/1.0/quickstart/). 
   Copy the string in the file.


## Configuration
There is a default configuration file in the directory **robots**. If a file called **custom_config.py**
is created in **robots** then the app will use it instead of the default file. It is useful to configure 
the **SECRET_KEY** for different environments.


## Running the app
Now its time to run the app, there are 3 options:

### Manually running the app
1. If the virtualenv has not been activated, activate it. From the root directory of the project
```
  . venv/bin/activate
```
2. Then, execute the following commands
```
  export FLASK_APP=robots
  export FLASK_DEBUG=1
  flask run
```

   If you do not want to run the app in debug mode, do not run the command **export FLASK_DEBUG=1**
   
   If you want to change the host ip address or the port
```
  flask run --port=PORT
``` 

And you can access to the app from any browser
```
  http://127.0.0.1:PORT/
```

### Using WSGI
For more information go [here](http://flask.pocoo.org/docs/1.0/deploying/mod_wsgi/)

Example of the apache site file conf I used. (I used SSL)
```
<IfModule mod_ssl.c>
<VirtualHost *:443>
        ServerAdmin email@example.com
        ServerName robots.com

        WSGIDaemonProcess robots user=USER threads=5 python-path=/PATH/TO/ROOT/OF/PROJECT
        WSGIScriptAlias / /PATH/TO/WSGI/FILE/IN/ROOT/OF/PROJECT

        <Directory /PATH/TO/ROOT/OF/PROJECT>
                 WSGIProcessGroup robots
                 WSGIApplicationGroup %{GLOBAL}
                 WSGIScriptReloading On
                 Order allow,deny
                 Allow from all
         </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

SSLCertificateFile /PATH/TO/CERT/FILE
SSLCertificateKeyFile /PATH/TO/KEY/FILE
Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
</IfModule>
```
