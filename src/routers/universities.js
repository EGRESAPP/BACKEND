const express = require('express')
const universities = require('../usecases/universities')
const router = express.Router();

const upload = require('../lib/uploadImg');

const isAuth = require("../middlewares/auth");

router.get('/', async (request, response) => {
    
    try {
      const allUniversities = await universities.getAll(request.query)
      response.json({
          success: true,
          message: 'All universities',
          data: allUniversities
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at get universities',
            error: error.message
        })
    }
})

router.delete('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const university = await universities.deleteById(id)
      response.json({
          success: true,
          message: 'university deleted',
          data: university
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at delete university',
            error: error.message
        })
    }
})

router.patch('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const university = await universities.updateById(id)
      response.json({
          success: true,
          message: 'university updated',
          data: university
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at update university',
            error: error.message
        })
    }
})

router.get('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const university = await universities.getById(id)
      response.json({
          success: true,
          message: 'university obtained',
          data: university
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at get university',
            error: error.message
        })
    }
})

router.post('/', async (request, response) => {
    try {
        const {body} = request;
        let university = await universities.create(body);
        response.json({
            success: true,
            message: 'university created',
            data: university
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
        const university = await universities.updateAvatar(location,email);

        response.json({
            success: true,
            message: 'Avatar updated',
            data: university
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
        const university = await universities.updateCover(location,email);

        response.json({
            success: true,
            message: 'Cover Updated',
            data: university
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