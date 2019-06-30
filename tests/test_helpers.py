def test_helpers_user(app):
    """ Test to find if user data is put in the correct place """
    username = 'name'
    password = 'password'

    # Creates test user
    with app.app_context():
        from robots import helpers

        user = helpers.User(username)
        user.create(password)
        user_info = user.user_info()

        assert user_info['username'] == username
        assert user_info['password'] == password

    # Removes test user from database
    # For some reason the user can't be removed in the same context than when it is created
    with app.app_context():
        from robots import helpers
        user = helpers.User(username)
        user.remove()


def test_helpers_project(app):
    """ Test to find if project data is put in the correct place """
    name = 'name'
    url = 'url'
    page = 'page'
    picture = 'picture'

    # Creates test project
    with app.app_context():
        from robots import helpers

        project = helpers.Project(name)
        project.create(url, page, picture)
        project_info = project.project_info()

        assert project_info['name'] == name
        assert project_info['url'] == url
        assert project_info['page'] == page
        assert project_info['picture'] == picture

    # Removes test project
    # Same reasons than for user
    with app.app_context():
        from robots import helpers
        project = helpers.Project(name)
        project.remove()
