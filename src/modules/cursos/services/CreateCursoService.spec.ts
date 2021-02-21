/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeCursosRepository from '../repositories/fakes/FakeCursosRepository';
import CreateCursoService from './CreateCursoService';

let fakeCursosRepository: FakeCursosRepository;
let createCurso: CreateCursoService;

describe('CreateCurso', () => {
  beforeEach(() => {
    fakeCursosRepository = new FakeCursosRepository();
    createCurso = new CreateCursoService(fakeCursosRepository);
  });

  it('deve ser possível criar um novo curso', async () => {
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
