import logging
from datetime import datetime
import bcrypt
from flask import g, request
from flask_restful import Resource, marshal_with, fields

import api.error.errors as error
from api.conf.auth import auth, refresh_jwt
from api.database.database import db
from api.models.models import Blacklist, User, Feedback
# from api.roles import role_required
# from api.schemas.schemas import UserSchema


class Index(Resource):
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
        users = User.query.all()
        return users


class Register(Resource):
    @staticmethod
    def post():
        try:
            # Get username, password and email.
            username, password, email, role = (
                request.json.get("username").strip(),
                request.json.get("password").strip(),
                request.json.get("email").strip(),
                request.json.get("role").strip(),
            )
        except Exception as why:

            # Log input strip or etc. errors.
            logging.info("Username, password or email is wrong. " + str(why))

            # Return invalid input error.
            return error.INVALID_INPUT_422

        # Check if any field is none.
        if username is None or password is None or email is None:
            return error.INVALID_INPUT_422

        # Get user if it is existed.
        user = User.query.filter_by(email=email).first()

        # Check if user exist.
        if user is not None:
            return error.ALREADY_EXIST

        # Create a new user.
        hashed_pass = bcrypt.hashpw(str(password).encode(), bcrypt.gensalt())
        user = User(username=username, password=hashed_pass,
                    email=email, user_role=role)

        # Add user to session.
        db.session.add(user)

        # Commit session.
        db.session.commit()
        #
        user = User.query.filter_by(email=email).first()

        # Return success if registration is completed.
        return {
            "user_id": user.id,
            "user_username": user.username,
            "user_email": request.json.get("email").strip(),
            "user_role": request.json.get("role").strip(),
            "complete": user.complete,
            }, 201


class Login(Resource):
    @staticmethod
    def post():

        try:
            # Get user email and password.
            email, password = (
                request.json.get("email").strip(),
                request.json.get("password").strip(),
            )
            print(email, password, "try")

        except Exception as why:
            # Log input strip or etc. errors.
            logging.info("Email or password is wrong. " + str(why))

            # Return invalid input error.
            return error.INVALID_INPUT_422

        # Check if user information is none.
        if email is None or password is None:
            return error.INVALID_INPUT_422

        # Get user if it is existed.
        user = User.query.filter_by(email=email).first()
        
        # Check if user is not existed.
        if not (user and bcrypt.checkpw(str(password).encode(), user.password)):
            return error.UNAUTHORIZED

        if user.user_role == "parent":
            # Generate access token. This method takes boolean value for checking admin or normal user. Admin: 1 or 0.
            access_token = user.generate_auth_token(0)

        # If user is super admin.
        elif user.user_role == "tutor":
            # Generate access token. This method takes boolean value for checking admin or normal user. Admin: 2, 1, 0.
            access_token = user.generate_auth_token(2)

        # else:
        #     return error.INVALID_INPUT_422

        # Generate refresh token.
        refresh_token = refresh_jwt.dumps({"email": email})

        # Return access token and refresh token.
        return {
            "user_id": user.id,
            "user_username": user.username,
            "user_email": user.email,
            "user_role": user.user_role,
            "complete": user.complete,
            "access_token": access_token.decode(),
            "refresh_token": refresh_token.decode(),
        }, 200


class Logout(Resource):
    @staticmethod
    @auth.login_required
    def post():

        # Get refresh token.
        refresh_token = request.json.get("refresh_token")

        # Get if the refresh token is in blacklist
        ref = Blacklist.query.filter_by(refresh_token=refresh_token).first()

        # Check refresh token is existed.
        if ref is not None:
            return {"status": "already invalidated", "refresh_token": refresh_token}

        # Create a blacklist refresh token.
        blacklist_refresh_token = Blacklist(refresh_token=refresh_token)

        # Add refresh token to session.
        db.session.add(blacklist_refresh_token)

        # Commit session.
        db.session.commit()

        # Return status of refresh token.
        return {"status": "invalidated", "refresh_token": refresh_token}, 200

class FeedbackHandler(Resource):
    resource_field = {
        'id': fields.Integer,
        'username': fields.String,
        'comment': fields.String,
        'date': fields.DateTime
    }
    @staticmethod
    @marshal_with(resource_field)
    def get():
        feeds = Feedback.query.all()
        return feeds
    
    @staticmethod
    def post():
        try:
            username,comment  = (
                request.json.get("username"),
                request.json.get("comment"),
            )
        except Exception as why:
            logging.info("Invalid input " + str(why))
            return error.INVALID_INPUT_422
        
        d = datetime.now()
        feedback = Feedback(username=username, comment=comment,date=d)
        db.session.add(feedback)
        db.session.commit()
        return {"status": "form submitted."}, 201



# class RefreshToken(Resource):
#     @staticmethod
#     def post():

#         # Get refresh token.
#         refresh_token = request.json.get("refresh_token")

#         # Get if the refresh token is in blacklist.
#         ref = Blacklist.query.filter_by(refresh_token=refresh_token).first()

#         # Check refresh token is existed.
#         if ref is not None:

#             # Return invalidated token.
#             return {"status": "invalidated"}

#         try:
#             # Generate new token.
#             data = refresh_jwt.loads(refresh_token)

#         except Exception as why:
#             # Log the error.
#             logging.error(why)

#             # If it does not generated return false.
#             return False

#         # Create user not to add db. For generating token.
#         user = User(email=data["email"])

#         # New token generate.
#         token = user.generate_auth_token(False)

#         # Return new access token.
#         return {"access_token": token}


# class ResetPassword(Resource):
#     @auth.login_required
#     def post(self):

#         # Get old and new passwords.
#         old_pass, new_pass = request.json.get("old_pass"), request.json.get("new_pass")

#         # Get user. g.user generates email address cause we put email address to g.user in models.py.
#         user = User.query.filter_by(email=g.user).first()

#         # Check if user password does not match with old password.
#         if user.password != old_pass:

#             # Return does not match status.
#             return {"status": "old password does not match."}

#         # Update password.
#         user.password = new_pass

#         # Commit session.
#         db.session.commit()

#         # Return success status.
#         return {"status": "password changed."}


# class UsersData(Resource):
#     @auth.login_required
#     @role_required.permission(2)
#     def get(self):
#         try:

#             # Get usernames.
#             usernames = (
#                 []
#                 if request.args.get("usernames") is None
#                 else request.args.get("usernames").split(",")
#             )

#             # Get emails.
#             emails = (
#                 []
#                 if request.args.get("emails") is None
#                 else request.args.get("emails").split(",")
#             )

#             # Get start date.
#             start_date = datetime.strptime(request.args.get("start_date"), "%d.%m.%Y")

#             # Get end date.
#             end_date = datetime.strptime(request.args.get("end_date"), "%d.%m.%Y")

#             print(usernames, emails, start_date, end_date)

#             # Filter users by usernames, emails and range of date.
#             users = (
#                 User.query.filter(User.username.in_(usernames))
#                 .filter(User.email.in_(emails))
#                 .filter(User.created.between(start_date, end_date))
#                 .all()
#             )

#             # Create user schema for serializing.
#             user_schema = UserSchema(many=True)

#             # Get json data
#             data, errors = user_schema.dump(users)

#             # Return json data from db.
#             return data

#         except Exception as why:

#             # Log the error.
#             logging.error(why)

#             # Return error.
#             return error.INVALID_INPUT_422


# # auth.login_required: Auth is necessary for this handler.
# # role_required.permission: Role required user=0, admin=1 and super admin=2.


# class DataUserRequired(Resource):
#     @auth.login_required
#     def get(self):

#         return "Test user data."


# class DataAdminRequired(Resource):
#     @auth.login_required
#     @role_required.permission(1)
#     def get(self):

#         return "Test admin data."


# class DataSuperAdminRequired(Resource):
#     @auth.login_required
#     @role_required.permission(2)
#     def get(self):

#         return "Test super admin data."
