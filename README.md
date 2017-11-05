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
3. Put the URL to the easyrtc server of bot1 in macro **bot_host().** Example:
```
{%macro bot_host()%}http://example.com{%- endmacro %}
```

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
  flask run --host=IP_ADDRESS:PORT
```

3. In the file **robots/templates/macros.html** change value of **URL** in the macro **bot_host** to 
the url that is used to host the easyrtc server that controls the bot. Not use quotation marks, they are 
needed. Example:
```
  http://example.com
```

And you can access to the app from any browser
```
  http://127.0.0.1:5000/
```
or
```
  http://IP_ADDRESS:PORT
```

### Using the run.py file
It is somewhat faster than running the app manually. However you can't change debug mode (it is on by default). 
Also the app is run in the default ip (**127.0.0.1**) and port (**5000**)

1. If the virtualenv has not been activated, activate it. From the root directory of the project
```
  . venv/bin/activate
```

2. Then run the **run.py** file that is in the root directory of the project
```
  python run.py
```

### Using WSGI
For more information go [here](http://flask.pocoo.org/docs/0.12/deploying/mod_wsgi/)

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
