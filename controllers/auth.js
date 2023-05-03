const jwt = require('jsonwebtoken')
require('dotenv').config()  
  const login = async (req,res)=>{

     if (req.body.username == process.env.USER_NAME && req.body.password == process.env.PASSWORD) {
        const token = jwt.sign(
            {
                USER_NAME: process.env.USER_NAME,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: '12h',
            },
          )
          return res.status(200).send({
            msg: 'Logged in!',
            token: token,
          })
    } else if (req.body.username != process.env.USER_NAME || req.body.password != process.env.PASSWORD){
      res.status(403).send({msg:'Invalid username or password'})

    }
    else res.status(500).send({msg:'Error while signing in user'})
     
      
  }
  //we need here to be sure that the user connected is the socuser of vermeg 
  // to do that we compare the decoded to the data 
  const validateToken = (req, res) => {
    // Get the JWT token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;
  
    if (authHeader) {
      // Verify the JWT token
      jwt.verify(authHeader, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          // If the token is invalid, return a 401 Unauthorized response
          return res.status(401).json({ message: 'Invalid token' });
        } else {
          // If the token is valid, return a 200 OK response
          return res.status(200).json({ valid: true });
        }
      });
    } else {
      // If no token was provided, return a 401 Unauthorized response
      return res.status(401).json({ message: 'No token provided' });
    }
  };

  
  
  
  
  
  
  
  

  module.exports = {
      login,
      validateToken
    }