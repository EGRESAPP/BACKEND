const express = require('express')
const users = require('../usecases/vacancies')
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
            message: 'Error at get all vacancies',
            error: error.message
        })
    }
})

router.delete('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const deleteVacancy = await vacancies.deleteById(id)
      response.json({
          success: true,
          message: 'delete vacancie',
          data: {
              vancancies: deleteVacancy
          }
      })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Error at delete vancancie',
            error: error.message
        })
    }
})

router.patch('/:id',isAuth, async (request, response) => {
    try {
        const { id } = request.params
      const updateVacancies = await vacancies.updateById(id)
      response.json({
          success: true,
          message: 'Vacancie update',
          data: {
              users: updateVacancies
          }
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

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
      const getVacancieById = await vacancie.getById(id)
      response.json({
          success: true,
          message: 'get vancancie',
          data: {
              users: getVacancieById
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
        let createVacancie = await vacancies.create(body);
        response.json({
            success: true,
            message: 'Vacancie created',
            data: {
                user: createVacancie
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

// router.put('/upload/avatar',upload.single('avatar'), async (request, response) => {
//     try {        
//         if(!request.file) 
//             throw new Error("Image required")
  
//         const {location} = request.file;
        
//         if(!request.body) 
//             throw new Error("Email required")

//         const {email} = request.body;
//         const userUpdated = await users.updateUserAvatar(location,email);

//         response.json({
//             success: true,
//             message: 'User Updated',
//             data: {
//                 user: userUpdated
//             }
//         });
      
//     } catch (error) {
//         response.status(400)
//         response.json({
//             success: false,
//             message: 'Error Uploding Avatar',
//             error: error.message
//         })
//     }
// });

// router.put('/upload/cover',upload.single('cover'), async (request, response) => {
//     try {        
//         if(!request.file) 
//             throw new Error("Image required")
  
//         const {location} = request.file;
        
//         if(!request.body) 
//             throw new Error("Email required")

//         const {email} = request.body;
//         const userUpdated = await users.updateUserCover(location,email);

//         response.json({
//             success: true,
//             message: 'Vacancie Updated',
//             data: {
//                 user: userUpdated
//             }
//         });
      
//     } catch (error) {
//         response.status(400)
//         response.json({
//             success: false,
//             message: 'Error Uploding Cover',
//             error: error.message
//         })
//     }
// });


module.exports = router;
