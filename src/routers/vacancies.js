const express = require('express')
const vacancies = require('../usecases/vacancies')
const router = express.Router();

const isAuth = require("../middlewares/auth");

router.get('/', async (request, response) => {
    
    try {
      const allVacancies = await vacancies.getAll(request.query)
      response.json({
          success: true,
          message: 'All vacancies',
          data: allVacancies
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at get all vacancies...',
            error: error.message
        })
    }
})

router.delete('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const deleteVacancy= await vacancies.deleteById(id)
      response.json({
          success: true,
          message: 'deleted vacancy',
          data: deleteVacancy
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at delete vacancie',
            error: error.message
        })
    }
})

router.patch('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const updateVacancy = await vacancies.updateById(id, request.body)
      response.json({
          success: true,
          message: 'Vacancy updateD',
          data: updateVacancy
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at update vacancie',
            error: error.message
        })
    }
})

router.get('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const getVacancyById = await vacancies.getById(id)
      response.json({
          success: true,
          message: 'get vacancy',
          data: getVacancyById
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at get id vacancy',
            error: error.message
        })
    }
})

router.post('/',isAuth, async (request, response) => {
    try {
        const {body} = request;
        let createVacancy = await vacancies.create(body);
        response.json({
            success: true,
            message: 'Vacancy created',
            data: createVacancy
        });
      
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at create vancancy',
            error: error.message
        })
    }
})


module.exports = router;
