from flask import session


def test_not_logged(client):
    """First test if the client is redirected to login when he or she is not logged in"""
    assert b'<a href="/login">' in client.get('/').data
    assert b'<a href="/login">' in client.get('/controller').data
    assert b'<a href="/login">' in client.get('/streamer').data
    assert b'<a href="/login">' in client.get('/logout').data

    # Test if /login is OK
    assert client.get('login').status_code == 200


def test_logged(client, auth):
    """Here we test how the app reacts when logged in"""

    auth.login()
    # Just to check if the client is logged in with session
    with client:
        client.get('/')
        assert session['logged_in'] is True

    # Now to check if the app loads the pages
    assert client.get('/').status_code == 200
    assert client.get('/controller').status_code == 200
    assert client.get('/streamer').status_code == 200

    # Test if login redirects to home once logged in
    assert b'<a href="/">' in client.get('/login').data


def test_log_out(client, auth):
    """Here we test for logging out"""
    auth.login()
    # Test if logout redirects to login once logged in
    # Note that this will logout the user
    assert b'<a href="/login">' in client.get('/logout').data

    # Check that session is erased
    with client:
        client.get('/')
        assert 'logged_in' not in session
