# -*- coding: utf-8 -*-
from utils import __cors
cors = lambda r : __cors(r,configuration)

@authJWT.allows_jwt(required=False, verify_expiration=False)
def authenticate():
    cors(response)
    if request.env.request_method == 'OPTIONS': return response.json({})
    return authJWT.jwt_token_manager()

@authJWT.allows_jwt()
@auth.requires_login()
def fecha():
    cors(response)
    if request.env.request_method == 'OPTIONS': return response.json({})
    return response.json(dict(fecha = request.now, user=auth.user.email))