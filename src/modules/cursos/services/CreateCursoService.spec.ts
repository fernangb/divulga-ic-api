/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeCursosRepository from '../repositories/fakes/FakeCursosRepository';
import CreateCursoService from './CreateCursoService';

describe('CreateCurso', () => {
  it('deve ser possível criar um novo curso', async () => {
    const fakeCursosRepository = new FakeCursosRepository();
    const createCurso = new CreateCursoService(fakeCursosRepository);

    const curso = await createCurso.execute({
      nome: 'Teste',
      id_predio: '1',
      tipo: 'Bacharel',
      endereco: 'Teste',
      turno: 'Integral',
    });

    expect(curso).toHaveProperty('id');
  });

  it('não deve ser permitido criar dois cursos iguais', async () => {
    const fakeCursosRepository = new FakeCursosRepository();
    const createCurso = new CreateCursoService(fakeCursosRepository);

    await createCurso.execute({
      nome: 'Teste',
      id_predio: '1',
      tipo: 'Bacharel',
      endereco: 'Teste',
      turno: 'Integral',
    });

    await expect(
      createCurso.execute({
        nome: 'Teste',
        id_predio: '1',
        tipo: 'Bacharel',
        endereco: 'Teste',
        turno: 'Integral',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
