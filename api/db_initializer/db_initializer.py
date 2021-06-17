import logging
from api.database.database import db
from api.models.models import User
import bcrypt


def create_super_admin():

    # Check if admin is existed in db.
    user = User.query.filter_by(email="admin@admin").first()

    # If user is none.
    if user is None:

        # Create admin user if it does not existed.
        hashed_pass = bcrypt.hashpw(str("admin").encode(), bcrypt.gensalt())
        user = User(
            username="admin",
            password= hashed_pass,
            email="admin@admin",
            user_role="admin",
        )
       

        # Add user to session.
        db.session.add(user)

        # Commit session.
        db.session.commit()

        # Print admin user status.
        logging.info("Super admin was set.")

    else:

        # Print admin user status.
        logging.info("Super admin already set.")
