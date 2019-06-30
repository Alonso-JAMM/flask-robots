def test_cli_user(app):
    username = 'name'
    password = 'password'
    new_username = 'new_username'
    new_password = 'new_password'

    with app.app_context():
        from robots import custom_cli
        runner = app.test_cli_runner()

        # Test if user is successfully created in database
        user_created = runner.invoke(custom_cli.create_user, [username, password])
        assert ("User " + username + " created!") in user_created.output

        # Test if user successfully change password
        user_password_changed = runner.invoke(custom_cli.change_user_password, [username, new_password])
        assert (username + "'s password has changed!") in user_password_changed.output

        # Test if user successfully changes name
        user_name_changed = runner.invoke(custom_cli.change_username, [username, new_username])
        assert (username + " changed to " + new_username) in user_name_changed.output

        # Test if user is successfully removed from database, remember that the user now has a different name
        user_removed = runner.invoke(custom_cli.remove_user, [new_username])
        assert (new_username + " has been removed!") in user_removed.output


def test_cli_project(app):
    name = 'test_name'
    new_name = 'new_test_name'
    url = 'test_url'
    new_url = 'new_test_url'
    page = 'test_page'
    new_page = 'new_test_page'
    picture = 'test_picture'
    new_picture = 'new_test_picture'

    with app.app_context():
        from robots import custom_cli
        runner = app.test_cli_runner()

        # Test if new project is successfully created
        project_created = runner.invoke(custom_cli.create_project, [name, url, page, picture])
        assert ("Project " + name + " has been created!") in project_created.output

        """ NEED TO CHECK IF PROJECT VALUES ARE PUT IN THE CORRESPONDING COLUMNS"""

        # Test if project changes url successfully
        project_new_url = runner.invoke(custom_cli.change_project_url, [name, new_url])
        assert ("Changed url of " + name) in project_new_url.output

        # Test if project changes page successfully
        project_new_page = runner.invoke(custom_cli.change_project_page, [name, new_page])
        assert ("Changed page of " + name) in project_new_page.output

        # Test if project changes picture successfully
        project_new_picture = runner.invoke(custom_cli.change_project_picture, [name, new_picture])
        assert ("Changed picture of " + name) in project_new_picture.output

        # Test if project changes name successfully
        project_new_name = runner.invoke(custom_cli.change_project_name, [name, new_name])
        assert (name + " changed to " + new_name) in project_new_name.output

        # Test if project is successfully removed, remember that the project now has a different name
        project_removed = runner.invoke(custom_cli.remove_project, [new_name])
        assert (new_name + " has been removed!") in project_removed.output

