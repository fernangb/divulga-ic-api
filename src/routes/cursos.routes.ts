import {Router} from 'express';

const cursosRouter = Router();

cursosRouter.post('/', (request, response) => {
  return response.json({message: 'Hello'});
})

export default cursosRouter;
