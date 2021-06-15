import logging
import json
from datetime import datetime
# import bcrypt
from flask import g, request, jsonify
from flask_restful import Resource, fields, marshal_with

import api.error.errors as error
from api.conf.auth import auth, refresh_jwt
from api.database.database import db
from api.models.models import Blacklist, Review, User, Tutor, Parent, Child, Match

from operator import itemgetter
from geopy.distance import geodesic


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
        'gender': fields.String,
        'phone': fields.String,
        'bio': fields.String,
        'location': fields.String,
        'assigned': fields.Boolean
    }

    @staticmethod
    @marshal_with(resource_field)
    def get():
        data = Tutor.query.all()
        return data


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
        'assigned': fields.Boolean
    }

    @staticmethod
    @marshal_with(resource_field)
    def get():
        data = Child.query.all()
        return data
    
# filter func
def filterObj(obj):
    if obj.assigned:
        return False
    if not obj.assigned:
        return True
    
class MatchHandler(Resource):
    @staticmethod
    def get(id):
        
        child = Child.query.filter_by(
            id=id).first()

        ts = Tutor.query.all()
        # filter fetched tutors based on status and change the return val back to list
        tutors = list(filter(filterObj, ts))
        
        # 9.0526281, 38.7577503
        child_location = child.location
        child_subject = child.subjects

        # get distance in miles and store it in an array
        distance_list = [{"id": tutors.index(tutor), "distance": geodesic(
            "9.0526281, 38.7577503", "9.0526281, 38.7577503").miles} for tutor in tutors]
        # sort the list, used itemgetter over lambda b/c of performance
        sorted_distance_list = sorted(
            distance_list, key=itemgetter('distance'))
        # take the first 10
        if len(sorted_distance_list) > 10:
            sorted_distance_list = sorted_distance_list[:11]
            
        # then sort again with subject
        data = []
        for item in sorted_distance_list:
            subject_list = []
            for subject in (tutors[item['id']].subjects).split(","):
                if subject in child_subject:
                    subject_list.append(subject)
            tut = {
                'tutor_data': {
                    "id":  tutors[item['id']].id,
                    "firstName":  tutors[item['id']].firstname,
                    "lastName":  tutors[item['id']].lastname,
                    "gender":  tutors[item['id']].gender,
                },
                'matching_subjects_length': len(subject_list),
                'matching_subjects': subject_list,
                'distance_in_between': item['distance']
            }
            data.append(tut)
        # again sort data list with number of matching subjects
        sorted_subject_list = sorted(data, key=itemgetter(
            'matching_subjects_length'), reverse=True)

        return {
            # "child": {
            #     "id": child.id,
            #     "firstname": child.firstname,
            #     "lastname": child.lastname,
            #     "gender": child.gender,
            #     "age": child.age,
            #     "subjects": child.subjects,
            #     "location": child.location,
            # },
            "match": sorted_subject_list
        }

    @staticmethod
    def post():
        try:
            print(request.json)
            # Get username, password and email.
            tutor_id, child_id = (
                request.json.get("tutor_id"),
                request.json.get("child_id"),
            )
        except Exception as why:
            logging.info("Invalid input " + str(why))
            return error.INVALID_INPUT_422

        match = Match(tutor_id=tutor_id, child_id=child_id)
        
        tutor = Tutor.query.filter_by(id=tutor_id).first()
        tutor.assigned = True
        child = Child.query.filter_by(id=child_id).first()
        child.assigned = True
        
        db.session.add(match)
        db.session.commit()
        return {"status": "form submitted."}, 201
