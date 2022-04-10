const  isLoggedIn = (req, res, done)=>{
   if (req.user) 
      return done()
   return res.redirect("/user/login");
};

export default isLoggedIn