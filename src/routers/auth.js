const express = require('express');
const auths = require('../usecases/auth');
const router = express.Router();

router.post('/login',async(request,response)=>{
    try {
        const {email,password,entity} = request.body;
        const user = await auths.login(email,password,entity);
        response.json({
            success: true,
            message: 'user logged in',
            data: user
        });
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Could not log in',
            error:error.message
            
        })
    }
});

module.exports = router;