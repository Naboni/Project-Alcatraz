from flask_restful import Api

from api.handlers.UserHandlers import (
    Index,
    Register,
    Login,
    Logout
)


def generate_routes(app):

    # Create api.
    api = Api(app)

    # Add all routes resources.
    # Index page.
    api.add_resource(Index, "/")

    # Register page.
    api.add_resource(Register, "/auth/register")

    # # Login page.
    api.add_resource(Login, "/auth/login")

    # # Logout page.
    api.add_resource(Logout, "/auth/logout")

    # # Refresh page.
    # api.add_resource(RefreshToken, "/auth/refresh")

    # # Password reset page. Not forgot.
    # api.add_resource(ResetPassword, "/auth/password_reset")

    # # Example user handler for user permission.
    # api.add_resource(DataUserRequired, "/data_user")

    # # Example admin handler for admin permission.
    # api.add_resource(DataAdminRequired, "/data_admin")

    # # Example user handler for user permission.
    # api.add_resource(DataSuperAdminRequired, "/data_super_admin")

    # # Get users page with admin permissions.
    # api.add_resource(UsersData, "/users")
