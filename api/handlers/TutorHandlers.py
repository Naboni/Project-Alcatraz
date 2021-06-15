import logging
from datetime import datetime
import bcrypt
from flask import g, request
from flask_restful import Resource

import api.error.errors as error
from api.conf.auth import auth, refresh_jwt
from api.database.database import db
from api.models.models import Blacklist, User, Tutor,Match,Child


class TutorHandler(Resource):
    @staticmethod
    def get(id):
        tutor = Tutor.query.filter_by(user_id=id).first()
        
        childrenUnderTutor = Match.query.filter_by(id=tutor.id).all()

        assignedChildren = []

        for child in childrenUnderTutor:
            c = Child.query.filter_by(id=child.id).first()
            assignedChildren.append({
                "id" : c.id,
                "firstName" : c.firstname,
                "lastName" : c.lastname,
                "gender" : c.gender,
                "age" : c.age,
                "subjects" : c.subjects,
                "location" : c.location,
            })

        tutorObj = {"tid":tutor.id, 
                    "firstname":tutor.firstname, 
                    "lastname":tutor.lastname,
                    "subjects":tutor.subjects,
                    "gender":tutor.gender,
                    "phone":tutor.phone,
                    "location":tutor.location,
                    "bio":tutor.bio,}
        
        data = {"tutor":tutorObj, "children":assignedChildren}
        return data

    @staticmethod
    def post():
        try:
            print(request.json)
            # Get username, password and email.
            firstname, lastname, subjects, gender, phone, location, bio, uid = (
                request.json.get("firstname").strip(),
                request.json.get("lastname").strip(),
                request.json.get("subjects").strip(),
                request.json.get("gender").strip(),
                request.json.get("phone").strip(),
                request.json.get("location").strip(),
                request.json.get("bio").strip(),
                request.json.get("uid"),
            )
        except Exception as why:
            logging.info("Invalid input " + str(why))
            return error.INVALID_INPUT_422

        tutor = Tutor(firstname=firstname, lastname=lastname, subjects=subjects,
                      gender=gender, phone=phone, location=location, bio=bio, user_id=uid)
        
        user = User.query.filter_by(id=uid).first()
        user.complete = True
        
        db.session.add(tutor)
        db.session.commit()

        return {"status": "form submitted."}, 201

    @staticmethod
    def patch():
        try:
            result = Tutor.query.filter_by(id=request.json.get("id")).first()

            if request.json.get("firstname"):
                result.firstname = request.json.get("firstname").strip()

            if request.json.get("lastname"):
                result.lastname = request.json.get("lastname").strip()

            if request.json.get("subjects"):
                result.subjects = request.json.get("subjects").strip()

            if request.json.get("gender"):
                result.gender = request.json.get("gender").strip()

            if request.json.get("phone"):
                result.phone = request.json.get("phone").strip()

            if request.json.get("location"):
                result.location = request.json.get("location").strip()

            if request.json.get("bio"):
                result.bio = request.json.get("bio").strip()

            if request.json.get("status"):
                result.assigned = request.json.get("status")

            db.session.commit()
            
        except Exception as why:
            logging.info("Invalid input " + str(why))
            return error.INVALID_INPUT_422

        return {"status": "form updated."}, 200
