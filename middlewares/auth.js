import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'please authanticate using a valid token',
    });
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET, {
        expiresIn: '1h',
      },function(err,data){
        
        if(err){
          return res.status(401).json({
            success: false,
            message: 'please authanticate using a valid token',
          });
        }
        
        return data;
      });
 
      req.user = data.user.user;
      
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'please authanticate using a valid token',
      });
    }
  }
};

export default verifyToken;
