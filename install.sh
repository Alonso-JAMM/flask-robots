#!/bin/bash

# TODO: It first need to check if virtualenv is installed
virtualenv -p python3 venv
 
. venv/bin/activate

pip install -e .

cd robots/

touch robots.db

sqlite3 robots.db < schema.sql
