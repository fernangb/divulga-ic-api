/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsuariosRepository from '../repositories/fakes/FakeUsuariosRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUsuarioService from './AuthenticateUsuarioService';
import CreateUsuarioService from './CreateUsuarioService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUsuario: AuthenticateUsuarioService;
let createUsuario: CreateUsuarioService;

describe('AuthenticateUsuario', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUsuario = new AuthenticateUsuarioService(
      fakeUsuariosRepository,
      fakeHashProvider,
    );
    createUsuario = new CreateUsuarioService(
      fakeUsuariosRepository,
      fakeHashProvider,
    );
  });

  it('deve ser possível autenticar um usuário', async () => {
    const usuario = await createUsuario.execute({
      email: 'teste@gmail.com',
      senha: '123456',
      id_nivel: '1',
      nome: 'Teste',
    });

    const response = await authenticateUsuario.execute({
      email: 'teste@gmail.com',
      senha: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(usuario);
  });

  it('não deve ser possível autenticar um usuário que não existe', async () => {
    await expect(
      authenticateUsuario.execute({
        email: 'teste@gmail.com',
        senha: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível autenticar um usuário com a senha errada', async () => {
    await createUsuario.execute({
      email: 'teste@gmail.com',
      senha: '123456',
      id_nivel: '1',
      nome: 'Teste',
    });

    await expect(
      authenticateUsuario.execute({
        email: 'teste@gmail.com',
        senha: '000000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
