const express=require("express");
const router = new express.Router();


router.post("./register", async(req, res)=>{
    try {
        console.log(req.body);
    } catch (error) {
        res.status(400).json({
            msg:"Failed to register"
        })
    }
})


module.exports=router;