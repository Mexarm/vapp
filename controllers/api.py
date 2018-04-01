# -*- coding: utf-8 -*-
from utils import __cors
cors = lambda r : __cors(r,configuration)

@authJWT.allows_jwt(required=False, verify_expiration=False)
def authenticate():
    cors(response)
    if request.env.request_method == 'OPTIONS': return response.json({})
    return authJWT.jwt_token_manager()

@authJWT.allows_jwt()
@auth.requires(True, requires_login=not (request.env.request_method == 'OPTIONS' and request.is_local))
def fecha():
    cors(response)
    if request.env.request_method == 'OPTIONS': return response.json({})
    return response.json(dict(fecha = request.now, user=auth.user.email))

#@authJWT.allows_jwt()
#@auth.requires(True, requires_login=not (request.env.request_method == 'OPTIONS' and request.is_local))
def translate():
    #print T.accepted_language
    #print T('hello', language='es-es')
    #T.set_current_languages('es', 'es-es')
    

    cors(response)
    if request.env.request_method == 'OPTIONS': return response.json({})
    if not request.vars: return
    T.force('es')
    translation = {}
    for key in request.vars:
        translation[key] = T(key)
    return response.json(translation)
