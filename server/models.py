from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-reviews.book', '-reviews.book')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String)

    reviews = db.relationship('Review', backref='user')
    books = association_proxy('reviews', 'book',
                              creator=lambda book_obj: Review(book=book_obj))

    def __repr__(self):
        return f'<User {self.id}, {self.username}: {self.first_name}, {self.last_name}>'

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    serialize_rules = ('-reviews.book', '-reviews.user')

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    summary = db.Column(db.String)
    year_published = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String)

    reviews = db.relationship('Review', backref='book')
    users = association_proxy('reviews', 'user',
                              creator=lambda user_obj: Review(user=user_obj))

    def __repr__(self):
        return f'<Book {self.id}, {self.title}: {self.author}, {self.summary}, {self.year_published}>'
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    rating = db.Column(db.Integer, nullable=False) #maybe constrain to less than 5

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

    def __repr__(self):
        return f'<Review {self.id}, {self.subject}: {self.description}, {self.rating}>'


