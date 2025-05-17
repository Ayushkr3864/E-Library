
const jwt = require("jsonwebtoken")
function IsLoggedIn(req,res,next){
  
  try{
    if(req.cookies.token ==="") {
      res.redirect("/login")
    }
    else{
      const data = jwt.verify(req.cookies.token,"ayush");
      req.user = data;
      next();
    } 
  }
  catch(err){
    
      return res.redirect("/login"); // or return res.status(401).send("Unauthorized");
    
  }
}


module.exports ={ IsLoggedIn };