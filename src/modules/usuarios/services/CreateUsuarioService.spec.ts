/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeUsuariosRepository from '../repositories/fakes/FakeUsuariosRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUsuarioService from './CreateUsuarioService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let fakeHashProvider: FakeHashProvider;
let createUsuario: CreateUsuarioService;

describe('CreateUsuario', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    fakeHashProvider = new FakeHashProvider();
    createUsuario = new CreateUsuarioService(
      fakeUsuariosRepository,
      fakeHashProvider,
    );
  });

  it('deve ser possível criar um novo usuário', async () => {
    const usuario = await createUsuario.execute({
      email: 'teste@gmail.com',
      senha: '123456',
      id_nivel: '1',
      nome: 'Teste',
    });

    expect(usuario).toHaveProperty('id');
  });

  it('não deve ser possível criar um novo usuário com o mesmo email', async () => {
    await createUsuario.execute({
      email: 'teste@gmail.com',
      senha: '123456',
      id_nivel: '1',
      nome: 'Teste',
    });

    await expect(
      createUsuario.execute({
        email: 'teste@gmail.com',
        senha: '123456',
        id_nivel: '1',
        nome: 'Teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
