import { Router } from 'express';
import AlunosController from '../controllers/AlunosController';

const alunoRouter = Router();

const alunosController = new AlunosController();

alunoRouter.post('/', alunosController.create);

export default alunoRouter;
