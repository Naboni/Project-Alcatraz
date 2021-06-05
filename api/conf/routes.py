from flask_restful import Api

from api.handlers.UserHandlers import (
    Index,
    Register,
    Login,
    Logout
)
from api.handlers.TutorHandlers import (
    TutorHandler, 
)
from api.handlers.CustomerHandler import (
    ParentHandler,
    ChildHandler,
    ReviewHandler,
)
from api.handlers.AdminHandlers import (
    MatchHandler, 
    AllUsers,
    AllChildren,
    AllParents,
    AllTutors
)

def generate_routes(app):

    # Create api.
    api = Api(app)

    api.add_resource(Index, "/")
    # User Handlers
    api.add_resource(Register, "/auth/register")
    api.add_resource(Login, "/auth/login")
    api.add_resource(Logout, "/auth/logout")
    # Tutor Handlers
    api.add_resource(TutorHandler, "/tutor")
    # Customer Handlers
    api.add_resource(ParentHandler, "/parent")
    api.add_resource(ChildHandler, "/child")
    api.add_resource(ReviewHandler, "/review")
    # Admin Handlers
    api.add_resource(MatchHandler, "/match")
    api.add_resource(AllUsers, "/allusers")
    api.add_resource(AllTutors, "/alltutors")
    api.add_resource(AllParents, "/allparents")
    api.add_resource(AllChildren, "/allchildren")


    
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
