const jwt=require('jsonwebtoken');
const User=require('../models/User');


// user authentication middleware to protect routes

const protect=async(req,res,next)=>{
    let token=req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null;
    if(token){

       try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id).select('-password');  // find user by id and exclude password in database
        
        if(!req.user){
            return res.status(401).json({message:'User not found'});
        }
        next();
    
    }catch(err){
        return res.status(401).json({message:'Token is not valid'});
        }
    }
    else{
        return res.status(401).json({message:'No token, authorization denied'});
    }
    
};

// protect routes for admin only
const admin=(req,res,next)=>{
    if(req.user && req.user.role==='admin'){  // if role==admin only then next else denied
        next();
    }else{
        return res.status(403).json({message:'Access denied. Admin only.'});
    }
}