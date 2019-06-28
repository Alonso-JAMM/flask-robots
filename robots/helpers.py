from flask import g
import sqlite3
# from robots import app
from flask import current_app

def connect_db():
    rv = sqlite3.connect(current_app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv


def get_db():
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db


def get_projects():
    db = get_db()
    try:
        rows = db.cursor().execute("SELECT * FROM projects")
        rows = rows.fetchall()
    except sqlite3.OperationalError:
        rows = None
        print("********************")
        print("sqlite3.OperationalError")
        print("There are not projects in database")
        print("********************")
    return rows


def get_project_data(name):
    db = get_db()
    try:
        # it is used in this way (name,) because it could cause problems without the parenthesis
        row = db.cursor().execute("SELECT * FROM projects WHERE name = ?", (name,))
        row = row.fetchone()
    except sqlite3.OperationalError:
        row = None
        print("*******************")
        print("sqlite3.OperationalError")
        print("There is not project in database")
        print("*******************")
    return row


def get_user_data(username):
    db = get_db()
    try:
        row = db.cursor().execute("SELECT * FROM users WHERE username = ?", (username,))
        row = row.fetchone()
    except sqlite3.OperationalError:
        row = None
        print("********************")
        print("sqlite3.OperationalError")
        print("There are not users in database")
        print("********************")
    return row


class User:
    def __init__(self, username):
        self.username = username
        self.userdb = get_user_data(self.username)
        self.db = get_db()

    def __is_in_database(self):
        if self.userdb is not None:
            return True
        else:
            return False

    def create(self, password):
        if not self.__is_in_database():
            self.db.cursor().execute("INSERT INTO users (username, password) values (?,?)",
                                     (self.username, password))
            self.db.commit()
            print("User " + self.username + " created!")

    def remove(self):
        if self.__is_in_database():
            self.db.cursor().execute("DELETE FROM users WHERE username = ?", (self.username,))
            self.db.commit()
            print(self.username + " has been removed!")

    def change_password(self, new_password):
        if self.__is_in_database():
            self.db.cursor().execute("UPDATE users SET password = ?", (new_password,))
            self.db.commit()
            print(self.username + "'s password has changed!")

    def change_username(self, new_username):
        if self.__is_in_database():
            self.db.cursor().execute("UPDATE users SET username = ?", (new_username,))
            self.db.commit()
            print(self.username + " changed to " + new_username)


class Project:
    def __init__(self, name):
        self.name = name
        self.projectdb = get_project_data(name)
        self.db = get_db()

    def __is_in_database(self):
        if self.projectdb is not None:
            return True
        else:
            return False

    def create(self, url, page, picture):
        if not self.__is_in_database():
            self.db.cursor().execute("INSERT INTO projects (name, url, page, picture) values "
                                     "(?,?,?,?)", (self.name, url, page, picture))
            self.db.commit()
            print("Project " + self.name + " has been created!")

    def remove(self):
        if self.__is_in_database():
            self.db.cursor().execute("DELETE FROM projects WHERE name = ?", (self.name,))
            self.db.commit()
            print(self.name + " has been removed!")

    def change_name(self, new_name):
        if self.__is_in_database():
            self.db.cursor().execute("UPDATE projects SET name = ?", (new_name,))
            self.db.commit()
            print(self.name + " changed to " + new_name)

    def change_url(self, new_url):
        if self.__is_in_database():
            self.db.cursor().execute("UPDATE projects SET url = ?", (new_url,))
            self.db.commit()
            print("Changed url of" + self.name)

    def change_page(self, new_page):
        if self.__is_in_database():
            self.db.cursor().execute("UPDATE projects SET page = ?", (new_page,))
            self.db.commit()
            print("Changed page of " + self.name)

    def change_picture(self, new_picture):
        if self.__is_in_database():
            self.db.cursor().execute("UPDATE projects SET picture = ?", (new_picture,))
            self.db.commit()
            print("Changed picture of " + self.name)