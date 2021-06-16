import logging
from datetime import datetime
import bcrypt
from flask import g, request
from flask_restful import Resource, fields, marshal_with


import api.error.errors as error
from api.conf.auth import auth, refresh_jwt
from api.database.database import db
from api.models.models import Blacklist, Review, User, Tutor, Parent, Child, Match


class ParentHandler(Resource):
    @staticmethod
    def get(id):
        # Get user if it is existed.
        user = User.query.filter_by(id=id).first()
        user_detail = Parent.query.filter_by(user_id=id).first()
        u = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created": str(user.created)
            }
        return {
            "user" : u,
            "user_detail": user_detail
        }, 200
        
    @staticmethod
    def post():
        try:
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
        
        user = User.query.filter_by(id=uid).first()
        user.complete = True
        
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
    def get(id):
        child = Child.query.filter_by(id=id).first()
        child_parent = Parent.query.filter_by(id=child.parent_id).first()
        # child_parent = Parent.
        return {
                    "child_data": {
                            "id": child.id,
                            "firstName": child.firstname,
                            "lastName": child.lastname,
                            "gender": child.gender,
                            "age": child.age,
                            "subjects": child.subjects,
                            "location": child.location,
                            "assigned": child.assigned,
                            "parent_id": child.parent_id,
                        },
                    "parent_data": {
                            "id": child_parent.id,
                            "firstName": child_parent.firstname,
                            "lastName": child_parent.lastname,
                            "location": child_parent.location,
                            "phone": child_parent.phone,
                        },
               }

    @staticmethod
    def post():
        try:
            # Get username, password and email.
            firstname, lastname,gender,age,subjects, parent_id  = (
                request.json.get("firstname").strip(),
                request.json.get("lastname").strip(),
                request.json.get("gender").strip(),
                request.json.get("age"),
                request.json.get("subjects").strip(),
                request.json.get("parent_id")
            )
        except Exception as why:
            logging.info("Invalid input " + str(why))
            return error.INVALID_INPUT_422

        parent = Parent.query.filter_by(user_id=parent_id).first()

        child = Child(firstname=firstname, lastname=lastname, 
        gender=gender,age=age, subjects=subjects, location=parent.location, parent_id=parent.id)

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
    
    @staticmethod
    def delete(id):
        result = Child.query.filter_by(id=id).first()
        if result:
            db.session.delete(result)
            db.session.commit()
        #     return {"message": "Child deleted"}, 200
        # return {"message": "Not found"}, 404
    


class ReviewHandler(Resource):
    resource_field = {
        'id': fields.Integer,
        'count': fields.Integer,
        'parent_name': fields.String,
        'tutor_id': fields.Integer,
        'comment': fields.String,
        'date': fields.DateTime,
    }
    @staticmethod
    @marshal_with(resource_field)
    def get():
        data = Review.query.all()
        return data
    
    @staticmethod
    def post():
        try:
            print(request.json)
            count, parent_name,tutor_id, comment  = (
                request.json.get("count"),
                request.json.get("parent_name"),
                request.json.get("tutor_id"),
                request.json.get("comment"),
            )
        except Exception as why:
            logging.info("Invalid input " + str(why))
            return error.INVALID_INPUT_422
        d = datetime.now()
        if(count):
            review = Review(count=count, parent_name=parent_name, 
            tutor_id=tutor_id,comment=comment,date=d)
        else:
            review = Review(count=0, parent_name=parent_name, 
            tutor_id=tutor_id,comment=comment,date=d)
            
            
        db.session.add(review)
        db.session.commit()
        return {"status": "form submitted."}, 201