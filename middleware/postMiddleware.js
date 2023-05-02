

let jwt=require("jsonwebtoken")

async function postMiddle(req,res,next){

    try {
        let token=req.headers.authorization.split(" ")[1]
        var decoded = jwt.verify(token, 'shhhhh');
        if(decoded){
            req.body.userID=decoded.userID
            next()
        }else{
          res.status(400).send({"err":"Something went wrong"})
        }
    } catch (error) {
        res.status(400).send({"err":"Something went wrong"})
    }
   
    

}

module.exports=postMiddle