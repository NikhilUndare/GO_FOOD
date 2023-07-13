const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const SECRET_CODE = "This is a secret a code"


router.post('/createuser',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 5 }),
        body('name').isLength({ min: 3 })
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt)
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: securePassword
            })

            res.json({ success: true })
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }

    })

// Authentication a User, No login Requiered
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const email = req.body.email
    const password = req.body.password
    try {

        let userdata = await User.findOne({ email })
        if (!userdata) {
           
            return res.status(400).json({ errors: "user does not exit" });

        }

        const pwdCompare =   bcrypt.compareSync(password,userdata.password)
        if (!pwdCompare) {
         
            return res.status(400).json({ errors: "Try logging with correct credentials" });

        }
        const data = {
            user: {
                id: userdata.id
            }
        }
        const authToken = jwt.sign(data, SECRET_CODE)
        return res.json({ success: true,  authToken })
    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }
})

//for food data rendering 

router.post('/foodData',(req,res)=>{
    try{
      res.send([global.food_item,global.foodCategory])
    }catch (error){
    console.error(error.message)
      res.send("server error")
    }
})



// for all the order placed by each user

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
           // console.log(data)
            console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})


module.exports = router;