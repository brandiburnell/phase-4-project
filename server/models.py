from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String)

    def __repr__(self):
        return f'<User {self.id}, {self.username}: {self.first_name}, {self.last_name}>'

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    year_published = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<User {self.id}, {self.title}: {self.author}, {self.description}, {self.year_published}>'
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String, nullable=False)
    text = db.Column(db.String)
    rating = db.Column(db.Integer, db.CheckConstraint('rating <= 5'), nullable=False)

    def __repr__(self):
        return f'<User {self.id}, {self.subject}: {self.text}, {self.rating}>'


