"""
This script runs the CrudeOilWebAPI application using a development server.
"""

from os import environ
from CrudeOilWebAPI import app
from flask import Flask
from flask_cors import CORS  # Import the CORS module


# Use CORS with your Flask app
CORS(app)

if __name__ == '__main__':
    HOST = environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(environ.get('SERVER_PORT', '5555'))
    except ValueError:
        PORT = 5555
    app.run(HOST, PORT)
