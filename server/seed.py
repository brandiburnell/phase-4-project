#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc, randrange

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Review, Book

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Deleting all records...")
        User.query.delete()
        Book.query.delete()
        Review.query.delete()

        print("Starting seed...")
        # Seed code goes here!

        print('Adding users...')
        # add User seed data
        users = []
        usernames = []

        for i in range(10):
            username = fake.first_name().lower() + fake.last_name().lower()

            user = User(
                username=username
            )

            users.append(user)

        db.session.add_all(users)

        print('Users added!')

        print('Adding books...')
        # add Book seed data
        books = []
        for i in range (20):
            book = Book(
                title=fake.text(max_nb_chars=20),
                author=fake.name(),
                summary=fake.paragraph(nb_sentences=3),
                year_published=fake.year(),
                image_url=fake.image_url()
            )

            books.append(book)

        db.session.add_all(books)

        print('Books added!')

        # add Review seed data
        print('Adding books...')
        reviews = []
        for i in range (20):
            review = Review(
                subject=fake.text(max_nb_chars=20),
                description=fake.paragraph(nb_sentences=3),
                rating=randint(1,5)
            )

            review.user = rc(users)
            review.book = rc(books)

            reviews.append(review)

        db.session.add_all(reviews)

        print('Reviews added!')

        print('Committing all data...')
        db.session.commit()

            
