/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeAreasRepository from '../repositories/fakes/FakeAreasRepository';
import CreateAreaService from './CreateAreaService';

let fakeAreasRepository: FakeAreasRepository;
let createArea: CreateAreaService;

describe('CreateArea', () => {
  beforeEach(() => {
    fakeAreasRepository = new FakeAreasRepository();
    createArea = new CreateAreaService(fakeAreasRepository);
  });

  it('deve ser possível criar uma nova área', async () => {
    const area = await createArea.execute({ nome: 'Teste' });

    expect(area).toHaveProperty('id');
  });

  it('não deve ser permitido criar duas áreas com o mesmo nome', async () => {
    await createArea.execute({ nome: 'Teste' });

    expect(createArea.execute({ nome: 'Teste' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
