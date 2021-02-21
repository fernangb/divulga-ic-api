/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeCampusRepository from '../repositories/fakes/FakeCampusRepository';
import CreateCampusService from './CreateCampusService';

let fakeCampusRepository: FakeCampusRepository;
let createCampus: CreateCampusService;

describe('CreateCampus', () => {
  beforeEach(() => {
    fakeCampusRepository = new FakeCampusRepository();
    createCampus = new CreateCampusService(fakeCampusRepository);
  });

  it('deve ser possível criar um novo campus', async () => {
    const campus = await createCampus.execute({
      nome: 'Teste',
      nome_comum: 'Teste',
      endereco: 'Teste',
    });

    expect(campus).toHaveProperty('id');
  });

  it('não deve ser permitido criar dois campus com o mesmo nome', async () => {
    await createCampus.execute({
      nome: 'Teste',
      nome_comum: 'Teste',
      endereco: 'Teste',
    });

    await expect(
      createCampus.execute({
        nome: 'Teste',
        nome_comum: 'Teste',
        endereco: 'Teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
