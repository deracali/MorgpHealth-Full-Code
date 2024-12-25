import express from 'express';
import {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
} from '../controllers/hospitalController.js';

const hospitalRouter = express.Router();

hospitalRouter.post('/create', createHospital);
hospitalRouter.get('/', getAllHospitals);
hospitalRouter.get('/:id', getHospitalById);
hospitalRouter.put('/:id', updateHospital);
hospitalRouter.delete('/delete/:id', deleteHospital);

export default hospitalRouter;
