const express = require('express')
const User = require('../models/user')
const userAuth = require('../middleware/user')
const router = new express.Router()

router.post('/API/User',async (req,res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.genarateAuthToken();
        res.send({user,token});
    }catch(e){
        res.status(400).send(e)
    }

});

router.post('/API/User/LogIn',async(req,res)=>{
    try{
        const user = await User.findByCredentiale(req.body.Email,req.body.PassWord);
        const token = await admin.genarateAuthToken();   
        res.send({user,token});
    }catch(e){
        res.status(400).send()
    }
})

router.get('/API/User/me',userAuth,(req,res)=>{
        const user = req.user
        const userStatus = req.userStatus
    res.send({user,userStatus})
})


router.get('/API/User',async(req,res)=>{
    try{
    const user = await User.find({})
    }catch(e){
        res.status(500).send(e)
    }
        

})
router.get('/Users/:id',(req,res)=>{
    const _id = req.params.id
    try{
    const user = User.findById(_id);
    if(!user){
        res.status(404).send()
    }else{
        res.send(user)
    }
}catch(e){
    res.status(500).send(e)
}
})

router.patch('/API/User/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Name',, 'email','Phone_Number','Address','PassWord']
    const isValidOperation = updates.every((update) =>allowedUpdates.includes(update))
    if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
    }
    try{
          const user = await User.findById(req.params.id);
          updates.forEach((update)=>{
            user[update] = req.body[update];
          })
          await user.save();
             if (!user) {
             return res.status(404).send()
             }
             res.send(user)
    }catch{
        res.status(400).send(e)
    }
})
router.delete('/API/User/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
        return res.status(404).send()
        }
        res.send(user)
       } catch (e) {
        res.status(500).send()
       }
   })

module.exports = router;
