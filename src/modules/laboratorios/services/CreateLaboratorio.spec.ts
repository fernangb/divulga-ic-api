/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeLaboratoriosRepository from '../repositories/fakes/FakeLaboratoriosRepository';

import CreateLaboratorioService from './CreateLaboratorioService';

let fakeLaboratoriosRepository: FakeLaboratoriosRepository;
let createLaboratorio: CreateLaboratorioService;

describe('CreateLaboratorio', () => {
  beforeEach(() => {
    fakeLaboratoriosRepository = new FakeLaboratoriosRepository();
    createLaboratorio = new CreateLaboratorioService(
      fakeLaboratoriosRepository,
    );
  });

  it('deve ser possível criar um novo laboratório', async () => {
    const laboratorio = await createLaboratorio.execute({
      nome: 'Teste',
      sigla: 'LABTESTE',
      id_predio: '1',
      sala: 'A123',
    });

    expect(laboratorio).toHaveProperty('id');
  });

  it('não deve ser possível criar um novo laboratório com o mesmo nome', async () => {
    await createLaboratorio.execute({
      nome: 'Teste',
      sigla: 'LABTESTE',
      id_predio: '1',
      sala: 'A123',
    });

    await expect(
      createLaboratorio.execute({
        nome: 'Teste',
        sigla: 'LABTESTE',
        id_predio: '1',
        sala: 'A123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
