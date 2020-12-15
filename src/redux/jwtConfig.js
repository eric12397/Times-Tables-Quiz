const jwtConfig = getState => {
  const jwt = getState().auth.jwt;
  console.log(jwt);
  
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  if (jwt) {
    config.headers['Authorization'] = jwt;
  }

  return config
}

export default jwtConfig