import express from 'express'
import {
    getCountries, 
    postCountry,
    findCountry,
    updateCountry,
    deleteCountry
} from '../controller/countriesController.js'
import validator from 'express-validator'
const { body, validationResult } = validator;

const router = express.Router()

router
    .get('/countries', (req, res)=> {
        res.send(getCountries())
    })
    .post('/countries', 
        body('name').isLength({min: 1}),
        body('alpha2Code').isLength({min: 2, max: 2}),
        body('alpha3Code').isLength({min: 3, max: 3}),
        async(req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            res.send(await postCountry({
                name: req.body.name,
                alpha2Code: req.body.alpha2Code,
                alpha3Code: req.body.alpha3Code
            }))
        }
    )

router
        .get('/countries/:code', (req, res) => {
            try {
                res.send(findCountry(req.params.code))
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        .delete('/countries/:code', (req, res) => {
            try {
                res.send(deleteCountry(req.params.code))
            } catch (error) {
                res.status(400).send({
                    error: error.message
                })
            }
        })
        .post(
            '/countries/:code', 
            body('name').isLength({min: 1}),
            body('alpha2Code').isLength({min: 2, max: 2}),
            body('alpha3Code').isLength({min: 3, max: 3}),
            (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                try {
                    res.send(updateCountry(
                        req.params.code, 
                        {
                            name: req.body.name,
                            alpha2Code: req.body.alpha2Code,
                            alpha3Code: req.body.alpha3Code                            
                        }
                    ))
                } catch (error) {
                    res.status(400).send({
                        error: error.message
                    })
                }
            }
        )

router.get('/', (req, res)=> {
    res.send({
        main: 'main'
    })
})



export default router