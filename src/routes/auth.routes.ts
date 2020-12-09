import { Router } from 'express';

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  try {
    const { email, senha } = request.body;

    return response.json({ ok: true });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default authRouter;
