import { Router } from 'express';
import ProfessoresController from '../controllers/ProfessoresController';

const professorRouter = Router();

const professoresController = new ProfessoresController();

professorRouter.post('/', professoresController.create);

export default professorRouter;
