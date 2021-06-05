import logging
import json
from datetime import datetime
import bcrypt
from flask import g, request, jsonify
from flask_restful import Resource, fields, marshal_with

import api.error.errors as error
from api.conf.auth import auth, refresh_jwt
from api.database.database import db
from api.models.models import Blacklist, Review, User, Tutor, Parent, Child, Match



class AllUsers(Resource):
    resource_field = {
        'id': fields.Integer,
        'username': fields.String,
        'email': fields.String,
        'created': fields.DateTime,
        'user_role': fields.String,
    }
    @staticmethod
    @marshal_with(resource_field)
    def get():
        data = User.query.all()
        return data

class AllTutors(Resource):
    resource_field = {
        'id': fields.Integer,
        'firstname': fields.String,
        'lastname': fields.String,
        'subjects': fields.String,
        'gender': fields.DateTime,
        'phone': fields.String,
        'bio': fields.String,
        'location': fields.String,
        'status': fields.Boolean
    }
    @staticmethod
    @marshal_with(resource_field)
    def get():
        data = Tutor.query.all()
        print(data)
        return "Matched Data"

class AllParents(Resource):
    resource_field = {
        'id': fields.Integer,
        'firstname': fields.String,
        'lastname': fields.String,
        'location': fields.String,
        'phone': fields.String,
    }
    @staticmethod
    @marshal_with(resource_field)
    def get():
        data = Parent.query.all()
        print(data)
        return "Matched Data"

class AllChildren(Resource):
    resource_field = {
        'id': fields.Integer,
        'firstname': fields.String,
        'lastname': fields.String,
        'gender': fields.String,
        'age': fields.Integer,
        'subjects': fields.String,
        'location': fields.String,
        'status': fields.Boolean
    }
    @staticmethod
    @marshal_with(resource_field)
    def get():
        data = Child.query.all()
        return data


class MatchHandler(Resource):
    resource_field = {
    'id': fields.Integer,
    'tutor_id': fields.Integer,
    'child_id': fields.Integer,
    }
    @staticmethod
    @marshal_with(resource_field)
    def get():
        data = Match.query.all()
        return data

    @staticmethod
    def post():
        try:
            print(request.json)
            # Get username, password and email.
            tutor_id, child_id  = (
                request.json.get("tutor_id"),
                request.json.get("child_id"),
            )
        except Exception as why:
            logging.info("Invalid input " + str(why))
            return error.INVALID_INPUT_422

        match = Match(tutor_id=tutor_id, child_id=child_id)

        db.session.add(match)
        db.session.commit()
        return {"status": "form submitted."}, 201