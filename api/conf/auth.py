from flask_httpauth import HTTPTokenAuth
from itsdangerous import TimedJSONWebSignatureSerializer as JsonWebToken

# JWT creation.
jwt = JsonWebToken("123456", expires_in=3600)

# Refresh token creation.
refresh_jwt = JsonWebToken("654321", expires_in=7200)

# Auth object creation.
auth = HTTPTokenAuth("Project")
