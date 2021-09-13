const express = require('express');
const auths = require('../usecases/auth');
const router = express.Router();

router.post('/login',async(request,response)=>{
    try {
        const {email,password} = request.body;
        const token = await auths.login(email,password);
        response.json({
            success: true,
            message: 'user logged in',
            data: {
                token:token
            }
        });
    } catch (error) {
        response.status(400)
        response.json({
            ssuccess: false,
            message: 'Could not log in',
            error: {
                error:error.message
            }
        })
    }
});

module.exports = router;