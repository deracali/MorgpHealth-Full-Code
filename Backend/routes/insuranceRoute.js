import express from 'express'
import { addInsurance, getAllInsurance, getInsurance } from '../controllers/insuranceController.js'

const insuranceRouter = express.Router()


insuranceRouter.post('/insurance/post',addInsurance)
insuranceRouter.get('/insurance/:userId',getInsurance)
insuranceRouter.get('/get', getAllInsurance);

export default insuranceRouter