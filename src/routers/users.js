const express = require('express')
const users = require('../usecases/users')
const router = express.Router();

const upload = require('../lib/uploadImg');

const isAuth = require("../middlewares/auth");

router.get('/',isAuth, async (request, response) => {
    
    try {
      const allUsers = await users.getAll(request.query)
      response.json({
          success: true,
          message: 'All users',
          data: allUsers
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at get all users',
            error: error.message
        })
    }
})

router.delete('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const deleteUsers = await users.deleteById(id)
      response.json({
          success: true,
          message: 'delete user',
          data: {
              users: deleteUsers
          }
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at delete users',
            error: error.message
        })
    }
})

router.patch('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const updateUsers = await users.updateById(id)
      response.json({
          success: true,
          message: 'User update',
          data: {
              users: updateUsers
          }
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at update user',
            error: error.message
        })
    }
})

router.get('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const getUsersById = await users.getById(id)
      response.json({
          success: true,
          message: 'get user',
          data: {
              users: getUsersById
          }
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at get id users',
            error: error.message
        })
    }
})

router.post('/', async (request, response) => {
    try {
        const {body} = request;
        let createUser = await users.create(body);
        response.json({
            success: true,
            message: 'User created',
            data: {
                user: createUser
            }
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
        const userUpdated = await users.updateUserAvatar(location,email);

        response.json({
            success: true,
            message: 'User Updated',
            data: {
                user: userUpdated
            }
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
        const userUpdated = await users.updateUserCover(location,email);

        response.json({
            success: true,
            message: 'User Updated',
            data: {
                user: userUpdated
            }
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