const express = require('express')
const records = require('../usecases/records')
const router = express.Router();

const isAuth = require("../middlewares/auth");

router.get('/', async (request, response) => {
    
    try {
      const allRecords = await records.getAll(request.query)
      response.json({
          success: true,
          message: 'All records',
          data: allRecords
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at get all records',
            error: error.message
        })
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
      const deleteRecords = await records.deleteById(id)
      response.json({
          success: true,
          message: 'delete record',
          data: {
              users: deleteRecords
          }
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at delete records',
            error: error.message
        })
    }
})

router.patch('/:id', async (request, response) => {
    try {
        const { id } = request.params
      const updateRecords = await records.updateById(id, request.body)
      response.json({
          success: true,
          message: 'record update',
          data: {
              records: updateRecords
          }
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at update record',
            error: error.message
        })
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
      const getRecordsById = await records.getById(id)
      response.json({
          success: true,
          message: 'get record',
          data: {
              record: getRecordsById
          }
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at get id records',
            error: error.message
        })
    }
})

router.post('/', async (request, response) => {
    try {
        const {body} = request;
        const createRecords = await records.create(body)
        response.json({
            success: true,
            message: 'record created',
            data: {
                record: createRecords
            }
        });
      
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at create record',
            error: error.message
        })
    }
})

module.exports = router;