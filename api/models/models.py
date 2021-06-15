from datetime import datetime


from flask import g
from sqlalchemy.orm import relationship

from api.conf.auth import auth, jwt
from api.database.database import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(length=80))
    password = db.Column(db.String(length=280))
    email = db.Column(db.String(length=80))
    created = db.Column(db.DateTime, default=datetime.utcnow)
    complete = db.Column(db.Boolean, default=False)
    user_role = db.Column(db.String)
    tutor = relationship("Tutor", uselist=False, backref="user")
    parent = relationship("Parent", uselist=False, backref="user")

    # Generates auth token.
    def generate_auth_token(self, permission_level):
        if permission_level == 2:
            # Generate admin token with flag 1.
            token = jwt.dumps({"email": self.email, "admin": 2})
            # Return admin flag.
            return token
        # Return normal user flag.
        return jwt.dumps({"email": self.email, "admin": 0})

    # Generates a new access token from refresh token.
    @staticmethod
    @auth.verify_token
    def verify_auth_token(token):
        # Create a global none user.
        g.user = None
        try:
            # Load token.
            data = jwt.loads(token)
        except:
            # If any error return false.
            return False
        # Check if email and admin permission variables are in jwt.
        if "email" and "admin" in data:
            # Set email from jwt.
            g.user = data["email"]
            # Set admin permission from jwt.
            g.admin = data["admin"]
            return True
        # If does not verified, return false.
        return False

    def __repr__(self):
        return "<User(id='%s', name='%s', password='%s', email='%s', created='%s', role='%s')>" % (
            self.id,
            self.username,
            self.password,
            self.email,
            self.created,
            self.user_role,
        )


class Blacklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # Blacklist invalidated refresh tokens.
    refresh_token = db.Column(db.String(length=255))

    def __repr__(self):
        # This is only for representation how you want to see refresh tokens after query.
        return "<User(id='%s', refresh_token='%s', status='invalidated.')>" % (
            self.id,
            self.refresh_token,
        )

class Tutor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(length=50))
    lastname = db.Column(db.String(length=50))
    subjects = db.Column(db.String(length=180))
    gender = db.Column(db.String(length=10))
    phone = db.Column(db.String(length=80))
    location = db.Column(db.String(length=80))
    bio = db.Column(db.String(length=200))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    assigned = db.Column(db.Boolean, default=False)
    match = relationship("Match", uselist=False, backref="tutor")
    review = relationship("Review")

    def __repr__(self):
        # This is only for representation how you want to see refresh tokens after query.
        return "<User(id='%s',firstname='%s', lastname='%s',subjects='%s',gender='%s',location='%s',bio='%s',uid='%s')>" % (
            self.id,
            self.firstname,
            self.lastname,
            self.subjects,
            self.gender,
            self.location,
            self.bio,
            self.user_id,
        )

class Parent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(length=50))
    lastname = db.Column(db.String(length=50))
    location = db.Column(db.String(length=80))
    phone = db.Column(db.String(length=80))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    child = relationship("Child")
    review = relationship("Review")

class Child(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(length=50))
    lastname = db.Column(db.String(length=50))
    gender = db.Column(db.String(length=50))
    age = db.Column(db.Integer)
    subjects = db.Column(db.String(length=180))
    location = db.Column(db.String(length=80))
    assigned = db.Column(db.Boolean, default=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('parent.id'), nullable=False)
    match = relationship("Match", uselist=False, backref="child")

class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tutor_id = db.Column(db.Integer, db.ForeignKey('tutor.id'), nullable=False)
    child_id = db.Column(db.Integer, db.ForeignKey('child.id'), nullable=False)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    count = db.Column(db.Integer)
    parent_id =  db.Column(db.Integer, db.ForeignKey('parent.id'), nullable=False)
    tutor_id =  db.Column(db.Integer, db.ForeignKey('tutor.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)