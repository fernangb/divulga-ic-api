/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeUsuariosRepository from '../repositories/fakes/FakeUsuariosRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUsuarioService from './CreateUsuarioService';

describe('CreateUsuario', () => {
  it('deve ser possível criar um novo usuário', async () => {
    const fakeUsuariosRepository = new FakeUsuariosRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsuario = new CreateUsuarioService(
      fakeUsuariosRepository,
      fakeHashProvider,
    );

    const usuario = await createUsuario.execute({
      email: 'teste@gmail.com',
      senha: '123456',
      id_nivel: '1',
    });

    expect(usuario).toHaveProperty('id');
  });

  it('não deve ser possível criar um novo usuário com o mesmo email', async () => {
    const fakeUsuariosRepository = new FakeUsuariosRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsuario = new CreateUsuarioService(
      fakeUsuariosRepository,
      fakeHashProvider,
    );

    await createUsuario.execute({
      email: 'teste@gmail.com',
      senha: '123456',
      id_nivel: '1',
    });

    await expect(
      createUsuario.execute({
        email: 'teste@gmail.com',
        senha: '123456',
        id_nivel: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
