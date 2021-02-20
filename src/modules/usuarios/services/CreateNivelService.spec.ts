/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeNiveisRepository from '../repositories/fakes/FakeNiveisRepository';
import CreateNivelService from './CreateNivelService';

describe('CreateNivel', () => {
  it('deve ser possível criar um novo nível de acesso', async () => {
    const fakeNiveisRepository = new FakeNiveisRepository();
    const createNivel = new CreateNivelService(fakeNiveisRepository);

    const nivel = await createNivel.execute({ nome: 'Teste' });

    expect(nivel).toHaveProperty('id');
  });

  it('não deve ser permitido criar dois níveis de acesso com o mesmo nome', async () => {
    const fakeNiveisRepository = new FakeNiveisRepository();
    const createNivel = new CreateNivelService(fakeNiveisRepository);

    await createNivel.execute({ nome: 'Teste' });

    expect(createNivel.execute({ nome: 'Teste' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
