from robots import app, helpers
import click


""" User related commands """


@app.cli.command()
@click.argument('username')
@click.argument('password')
def create_user(username, password):
    user = helpers.User(username)
    user.create(password)


@app.cli.command()
@click.argument('username')
def remove_user(username):
    user = helpers.User(username)
    user.remove()


@app.cli.command()
@click.argument('username')
@click.argument('password')
def change_user_password(username, password):
    user = helpers.User(username)
    user.change_password(password)


@app.cli.command()
@click.argument('username')
@click.argument('new_username')
def change_username(username, new_username):
    user = helpers.User(username)
    user.change_username(new_username)


""" Project related commands """


@app.cli.command()
@click.argument('name')
@click.argument('url')
@click.argument('page')
@click.argument('picture')
def create_project(name, url, page, picture):
    project = helpers.Project(name)
    project.create(url, page, picture)


@app.cli.command()
@click.argument('name')
def remove_project(name):
    project = helpers.Project(name)
    project.remove()


@app.cli.command()
@click.argument('name')
@click.argument('new_name')
def change_project_name(name, new_name):
    project = helpers.Project(name)
    project.change_name(new_name)


@app.cli.command()
@click.argument('name')
@click.argument('new_url')
def change_project_url(name, new_url):
    project = helpers.Project(name)
    project.change_url(new_url)


@app.cli.command()
@click.argument('name')
@click.argument('new_page')
def change_project_page(name, new_page):
    project = helpers.Project(name)
    project.change_page(new_page)


@app.cli.command()
@click.argument('name')
@click.argument('new_picture')
def change_project_picture(name, new_picture):
    project = helpers.Project(name)
    project.change_picture(new_picture)