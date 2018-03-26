def __cors(response, configuration):
  if configuration.get('api.enable_cors'):
    response.headers['Access-Control-Allow-Origin'] = configuration.get('api.access_control_allow_origin')
    response.headers['Access-Control-Expose-Headers'] = 'access-control-allow-origin'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'