import os
import tempfile
import pytest
from robots import create_app


@pytest.fixture
def app():
    """Creates a new app"""
    app = create_app()

    yield app


@pytest.fixture
def client(app):
    """Creates a client for the app"""
    return app.test_client()


class LogActions(object):
    def __init__(self, client):
        self._client = client

    def login(self, username='default', password='123'):
        return self._client.post(
            '/login',
            data={'username': username, 'password': password}
        )


@pytest.fixture
def auth(client):
    return LogActions(client)

