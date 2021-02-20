/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsuariosRepository from '../repositories/fakes/FakeUsuariosRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUsuarioService from './AuthenticateUsuarioService';
import CreateUsuarioService from './CreateUsuarioService';

describe('AuthenticateUsuario', () => {
  it('deve ser possível autenticar um usuário', async () => {
    const fakeUsuariosRepository = new FakeUsuariosRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUsuario = new AuthenticateUsuarioService(
      fakeUsuariosRepository,
      fakeHashProvider,
    );
    const createUsuario = new CreateUsuarioService(
      fakeUsuariosRepository,
      fakeHashProvider,
    );

    const usuario = await createUsuario.execute({
      email: 'teste@gmail.com',
      senha: '123456',
      id_nivel: '1',
    });

    const response = await authenticateUsuario.execute({
      email: 'teste@gmail.com',
      senha: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(usuario);
  });

  it('não deve ser possível autenticar um usuário que não existe', async () => {
    const fakeUsuariosRepository = new FakeUsuariosRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUsuario = new AuthenticateUsuarioService(
      fakeUsuariosRepository,
      fakeHashProvider,
    );

    await expect(
      authenticateUsuario.execute({
        email: 'teste@gmail.com',
        senha: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível autenticar um usuário com a senha errada', async () => {
    const fakeUsuariosRepository = new FakeUsuariosRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUsuario = new AuthenticateUsuarioService(
      fakeUsuariosRepository,
      fakeHashProvider,
    );
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
      authenticateUsuario.execute({
        email: 'teste@gmail.com',
        senha: '000000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
