const express = require('express');
const auths = require('../middlewares/auth');
const router = express.Router();
const applications =require("../usecases/applications")

 //obtener la postulacion por id
router.get('/:id',auths, async (request, response) => {
    try {
        const applicationsById = await applications.get(request.query)
        response.json({
            success: true,
            message: 'applicationsById',
            data: applicationsById
        })
      } catch (error) {
          response.status(400)
          response.json({
              success: false,
              message: 'error at applications',
              error: error.message
          })
      }
})
 // obetener todas las postulaciones
router.get('/', async (request, response) => {
    
    try {
      const allAplications = await applications.getAll(request.query)
      response.json({
          success: true,
          message: 'All applications',
          data: allAplications
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at get all applications',
            error: error.message
        })
    }
})
// crear application
router.post('/', async (request, response) => {
    try {
        const {body} = request;
        console.log(body);
        const createApplications = await applications.create(body)
        response.json({
            success: true,
            message: 'create application',
            data: {
                application: createApplications
            }
        });
      
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at create the application: ',
            error: error.message
        })
    }
})
//actualizacion del application
router.patch('/:id', async (request, response) => {
    try {
      const { id } = request.params
      const applicationUpdated = await applications.updateById(id, request.body)
  
      response.json({
        success: true,
        message: 'application updated',
        data: {
          application: applicationUpdated
        }
      })
    } catch (error) {
      response.status(400)
      response.json({
        success: false,
        message: 'Error at application update',
        error: error.message
      })
    }
  })
    //eliminar application
  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params
      const applicationDeleted = await applications.deleteById(id)
  
      response.json({
        success: true,
        message: 'application deleted',
        data: {
          application: applicationDeleted
        }
      })
    } catch (error) {
      response.status(400)
      response.json({
        success: false,
        message: 'Error at application deleted',
        error: error.message
      })
    }
  })

module.exports = router;