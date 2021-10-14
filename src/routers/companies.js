const express = require('express')
const companies = require('../usecases/companies')
const router = express.Router();

const upload = require('../lib/uploadImg');

const isAuth = require("../middlewares/auth");

router.get('/', async (request, response) => {
    
    try {
      const allCompanies = await companies.getAll(request.query)
      response.json({
          success: true,
          message: 'All companies',
          data: allCompanies
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at get companies',
            error: error.message
        })
    }
})

router.delete('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const company = await companies.deleteById(id)
      response.json({
          success: true,
          message: 'company deleted',
          data: company
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at delete company',
            error: error.message
        })
    }
})

router.patch('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
        const company = await companies.updateById(id,request.body)
        response.json({
          success: true,
          message: 'company updated',
          data: company
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at update company',
            error: error.message
        })
    }
})

router.get('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const company = await companies.getById(id)
      response.json({
          success: true,
          message: 'company obtained',
          data: company
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at get company',
            error: error.message
        })
    }
})

router.post('/', async (request, response) => {
    try {
        const {body} = request;
        let company = await companies.create(body);
        response.json({
            success: true,
            message: 'company created',
            data: company
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
        const company = await companies.updateAvatar(location,email);

        response.json({
            success: true,
            message: 'Avatar updated',
            data: company
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
        const company = await companies.updateCover(location,email);

        response.json({
            success: true,
            message: 'Cover Updated',
            data: company
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