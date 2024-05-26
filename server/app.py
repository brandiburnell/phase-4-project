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
    
    def post(self):
        request_data = request.get_json()
        newBook = Book(
            title=request_data['title'],
            author=request_data['author'],
            year_published=request_data['yearPublished'],
            summary=request_data['summary'],
            image_url=request_data['imageUrl']
        )
        
        db.session.add(newBook)
        db.session.commit()

        return make_response(newBook.to_dict(), 201)

class BookByID(Resource):
    def get(self, id):
        book = Book.query.filter_by(id=id).first().to_dict()

        return make_response(book, 200)
    
    def delete(self, id):
        book = Book.query.filter_by(id=id).first()
        db.session.delete(book)
        
        book_reviews = book.reviews
        for review in book_reviews:
            db.session.delete(review)

        db.session.commit()

        make_response('message successfuly deleted', 200)

    
class Reviews(Resource):
    def post(self):
        request_data = request.get_json()
        print(request_data)

        try:
            user = User.query.filter_by(username=request_data['username']).first()

            newReview = Review(
            book_id = request_data['bookId'],
            description = request_data['description'],
            rating = request_data['rating'],
            subject = request_data['subject'],
            user_id = user.id# look up user id from db from user input
            )

            db.session.add(newReview)
            db.session.commit()

            print(newReview)

        except:
            new_user = User(
                username = request_data['username']
            )
            db.session.add(new_user)
            db.session.commit()

            user = User.query.filter_by(username=request_data['username']).first()

            newReview = Review(
            book_id = request_data['bookId'],
            description = request_data['description'],
            rating = request_data['rating'],
            subject = request_data['subject'],
            user_id = user.id # look up user id from db from user input
            )

            print(newReview)

            db.session.add(newReview)
            db.session.commit()
        
        return make_response(request_data, 201)
    
class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first().to_dict()

        return make_response(user, 200)

api.add_resource(Home, '/')
api.add_resource(Books, '/books')
api.add_resource(BookByID, '/books/<int:id>')
api.add_resource(Reviews, '/reviews')
api.add_resource(UserByID, '/users/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

