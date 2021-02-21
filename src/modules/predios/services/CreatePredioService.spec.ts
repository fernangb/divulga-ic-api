/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakePrediosRepository from '../repositories/fakes/FakePrediosRepository';
import CreatePredioService from './CreatePredioService';

let fakePrediosRepository: FakePrediosRepository;
let createPredio: CreatePredioService;

describe('CreatePredio', () => {
  beforeEach(() => {
    fakePrediosRepository = new FakePrediosRepository();
    createPredio = new CreatePredioService(fakePrediosRepository);
  });

  it('deve ser possível criar um novo prédio', async () => {
    const predio = await createPredio.execute({
      nome: 'Teste',
      nome_comum: 'Teste',
      endereco: 'Teste',
      id_campus: '1',
    });

    expect(predio).toHaveProperty('id');
  });

  it('não deve ser permitido criar dois prédios com o mesmo nome', async () => {
    await createPredio.execute({
      nome: 'Teste',
      nome_comum: 'Teste',
      endereco: 'Teste',
      id_campus: '1',
    });

    await expect(
      createPredio.execute({
        nome: 'Teste',
        nome_comum: 'Teste',
        endereco: 'Teste',
        id_campus: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
