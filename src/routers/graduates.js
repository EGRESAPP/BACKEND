const express = require('express')
const graduates = require('../usecases/graduates')
const router = express.Router();

const upload = require('../lib/uploadImg');

const isAuth = require("../middlewares/auth");

router.get('/', async (request, response) => {
    
    try {
      const allGraduates = await graduates.getAll(request.query)
      response.json({
          success: true,
          message: 'All graduates',
          data: allGraduates
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at get graduates',
            error: error.message
        })
    }
})

router.delete('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const graduate = await graduates.deleteById(id)
      response.json({
          success: true,
          message: 'Graduate deleted',
          data: graduate
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at delete graduate',
            error: error.message
        })
    }
})

router.patch('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const graduate = await graduates.updateById(id,request.body)
      response.json({
          success: true,
          message: 'Graduate updated',
          data: graduate
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at update graduate',
            error: error.message
        })
    }
})

router.get('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const graduate = await graduates.getById(id)
      response.json({
          success: true,
          message: 'Graduate obtained',
          data: graduate
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at get graduate',
            error: error.message
        })
    }
})

router.post('/', async (request, response) => {
    try {
        const {body} = request;
        let graduate = await graduates.create(body);
        response.json({
            success: true,
            message: 'Graduate created',
            data: graduate
        });
      
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at create user',
            error: error.message
        })
    }
})

router.put('/upload/avatar',upload.single('avatar'),isAuth, async (request, response) => {
    try {        
        if(!request.file) 
            throw new Error("Image required")
  
        const {location} = request.file;
        if(!request.body) 
            throw new Error("Email required")

        const {email} = request.body;
        const graduate = await graduates.updateAvatar(location,email);

        response.json({
            success: true,
            message: 'Avatar Updated',
            data: graduate
        });
      
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error Uploding Avatar',
            error: error.message
        })
    }
});

router.put('/upload/cover',upload.single('cover'),isAuth, async (request, response) => {
    try {        
        if(!request.file) 
            throw new Error("Image required")
  
        const {location} = request.file;
        
        if(!request.body) 
            throw new Error("Email required")

        const {email} = request.body;
        const graduate = await graduates.updateCover(location,email);

        response.json({
            success: true,
            message: 'Cover Updated',
            data: graduate
        });
      
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error Uploding Cover',
            error: error.message
        })
    }
});


module.exports = router;