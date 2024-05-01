#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Book, Review

# Views go here!
class Home(Resource):
    def get(self):
        return make_response('Welcome to the Books API', 200)
    
class Books(Resource):
    def get(self):
        books = [book.to_dict() for book in Book.query.all()]

        return make_response(books, 200)

api.add_resource(Home, '/')
api.add_resource(Books, '/books')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

