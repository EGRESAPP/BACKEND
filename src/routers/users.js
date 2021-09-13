const express = require('express')
const users = require('../usecases/users')
const router = express.Router();

const isAuth = require("../middlewares/auth");

router.get('/', async (request, response) => {
    
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
          message: 'user update',
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

router.get('/:id', async (request, response) => {
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
        console.log(body);
        const createUsers = await users.create(body)
        response.json({
            success: true,
            message: 'user created',
            data: {
                users: createUsers
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

module.exports = router;
