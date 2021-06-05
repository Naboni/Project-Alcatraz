import logging
from datetime import datetime
import bcrypt
from flask import g, request
from flask_restful import Resource

import api.error.errors as error
from api.conf.auth import auth, refresh_jwt
from api.database.database import db
from api.models.models import Blacklist, Review, User, Tutor, Parent, Child, Match


class ParentHandler(Resource):
    @staticmethod
    def get():
        return "Parent Data"
    @staticmethod
    def post():
        try:
            print(request.json)
            # Get username, password and email.
            firstname, lastname, location, phone, uid  = (
                request.json.get("firstname").strip(),
                request.json.get("lastname").strip(),
                request.json.get("location").strip(),
                request.json.get("phone").strip(),
                request.json.get("uid"),
            )
        except Exception as why:
            logging.info("Invalid input " + str(why))
            return error.INVALID_INPUT_422

        parent = Parent(firstname=firstname, lastname=lastname, location=location, 
        phone=phone, user_id=uid)

        db.session.add(parent)
        db.session.commit()
        return {"status": "form submitted."}, 201
    @staticmethod
    def patch():
        try:
            result = Parent.query.filter_by(id=request.json.get("id")).first()

            if request.json.get("firstname"):
                result.firstname = request.json.get("firstname").strip()

            if request.json.get("lastname"):
                result.lastname = request.json.get("lastname").strip()

            if request.json.get("phone"):
                result.phone = request.json.get("phone").strip()

            if request.json.get("location"):
                result.location = request.json.get("location").strip()

            db.session.commit()
            
        except Exception as why:
            logging.info("Invalid input " + str(why))
            return error.INVALID_INPUT_422

        return {"status": "form updated."}, 200


class ChildHandler(Resource):
    @staticmethod
    def get():
        return "Child Data"

    @staticmethod
    def post():
        try:
            print(request.json)
            # Get username, password and email.
            firstname, lastname,gender,age,subjects,location, parent_id  = (
                request.json.get("firstname").strip(),
                request.json.get("lastname").strip(),
                request.json.get("gender").strip(),
                request.json.get("age"),
                request.json.get("subjects").strip(),
                request.json.get("location").strip(),
                request.json.get("parent_id")
            )
        except Exception as why:
            logging.info("Invalid input " + str(why))
            return error.INVALID_INPUT_422

        child = Child(firstname=firstname, lastname=lastname, 
        gender=gender,age=age, subjects=subjects, location=location,status=False, parent_id=parent_id)

        db.session.add(child)
        db.session.commit()
        return {"status": "form submitted."}, 201
    
    @staticmethod
    def patch():
        try:
            result = Child.query.filter_by(id=request.json.get("id")).first()

            if request.json.get("status"):
                result.assigned = request.json.get("status")
            db.session.commit()
            
        except Exception as why:
            logging.info("Invalid input " + str(why))
            return error.INVALID_INPUT_422

        return {"status": "form updated."}, 200
    

class ReviewHandler(Resource):
    @staticmethod
    def get():
        return "Review Data"
    @staticmethod
    def post():
        try:
            print(request.json)
            # Get username, password and email.
            count, parent_id,tutor_id  = (
                request.json.get("count"),
                request.json.get("parent_id"),
                request.json.get("tutor_id"),
            )
        except Exception as why:
            logging.info("Invalid input " + str(why))
            return error.INVALID_INPUT_422
        d = datetime.now()
        review = Review(count=count, parent_id=parent_id, 
        tutor_id=tutor_id,date=d)

        db.session.add(review)
        db.session.commit()
        return {"status": "form submitted."}, 201