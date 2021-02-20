/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeUsuariosRepository from '../repositories/fakes/FakeUsuariosRepository';
import CreateUsuarioService from './CreateUsuarioService';

describe('CreateUsuario', () => {
  it('deve ser possível criar um novo usuário', async () => {
    const fakeUsuariosRepository = new FakeUsuariosRepository();
    const createUsuario = new CreateUsuarioService(fakeUsuariosRepository);

    const usuario = await createUsuario.execute({
      email: 'teste@gmail.com',
      senha: '123456',
      id_nivel: '1',
    });

    expect(usuario).toHaveProperty('id');
  });

  it('não deve ser possível criar um novo usuário com o mesmo email', async () => {
    const fakeUsuariosRepository = new FakeUsuariosRepository();
    const createUsuario = new CreateUsuarioService(fakeUsuariosRepository);

    await createUsuario.execute({
      email: 'teste@gmail.com',
      senha: '123456',
      id_nivel: '1',
    });

    expect(
      createUsuario.execute({
        email: 'teste@gmail.com',
        senha: '123456',
        id_nivel: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
