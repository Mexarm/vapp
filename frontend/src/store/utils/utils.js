function parseJwt(token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}

function getUser(token) {
  let parsedToken = parseJwt(token)
  const user = {
    first_name: parsedToken.user.first_name,
    last_name: parsedToken.user.last_name,
    email: parsedToken.user.email,
    id: parsedToken.user.id
    // groups: parsedToken.user_groups
  }
  return user
}

function expiredJwt(token) {
  let parsedToken = parseJwt(token)
  let now = new Date()
  return (parsedToken.exp <= now.getTime())
}

export {
  parseJwt,
  getUser,
  expiredJwt
}
