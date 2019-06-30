from robots import helpers
import click
from flask.cli import with_appcontext
from flask import current_app

""" User related commands """


@click.command('create_user')
@with_appcontext
@click.argument('username')
@click.argument('password')
def create_user(username, password):
    user = helpers.User(username)
    user.create(password)


@click.command('remove_user')
@with_appcontext
@click.argument('username')
def remove_user(username):
    user = helpers.User(username)
    user.remove()


@click.command('change_user_password')
@with_appcontext
@click.argument('username')
@click.argument('password')
def change_user_password(username, password):
    user = helpers.User(username)
    user.change_password(password)


@click.command('change_username')
@with_appcontext
@click.argument('username')
@click.argument('new_username')
def change_username(username, new_username):
    user = helpers.User(username)
    user.change_username(new_username)


""" Project related commands """


@click.command('create_project')
@with_appcontext
@click.argument('name')
@click.argument('url')
@click.argument('page')
@click.argument('picture')
def create_project(name, url, page, picture):
    project = helpers.Project(name)
    project.create(url, page, picture)


@click.command('remove_project')
@with_appcontext
@click.argument('name')
def remove_project(name):
    project = helpers.Project(name)
    project.remove()


@click.command('change_project_name')
@with_appcontext
@click.argument('name')
@click.argument('new_name')
def change_project_name(name, new_name):
    project = helpers.Project(name)
    project.change_name(new_name)


@click.command('change_project_url')
@with_appcontext
@click.argument('name')
@click.argument('new_url')
def change_project_url(name, new_url):
    project = helpers.Project(name)
    project.change_url(new_url)


@click.command('change_project_page')
@with_appcontext
@click.argument('name')
@click.argument('new_page')
def change_project_page(name, new_page):
    project = helpers.Project(name)
    project.change_page(new_page)


@click.command('change_project_picture')
@with_appcontext
@click.argument('name')
@click.argument('new_picture')
def change_project_picture(name, new_picture):
    project = helpers.Project(name)
    project.change_picture(new_picture)


""" Adds commands """
current_app.cli.add_command(create_user)
current_app.cli.add_command(remove_user)
current_app.cli.add_command(change_user_password)
current_app.cli.add_command(change_username)
current_app.cli.add_command(create_project)
current_app.cli.add_command(remove_project)
current_app.cli.add_command(change_project_name)
current_app.cli.add_command(change_project_url)
current_app.cli.add_command(change_project_page)
current_app.cli.add_command(change_project_picture)
