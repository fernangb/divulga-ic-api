/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeUsuariosRepository from '@modules/usuarios/repositories/fakes/FakeUsuariosRepository';
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';
import FakeHashProvider from '@modules/usuarios/providers/HashProvider/fakes/FakeHashProvider';
import FakeProfessoresRepository from '../repositories/fakes/FakeProfessoresRepository';
import CreateProfessorService from './CreateProfessorService';

let fakeProfessoresRepository: FakeProfessoresRepository;
let fakeUsuariosRepository: FakeUsuariosRepository;
let fakeHashProvider: FakeHashProvider;
let createProfessor: CreateProfessorService;
let createUsuario: CreateUsuarioService;

describe('CreateProfessor', () => {
  beforeEach(() => {
    fakeProfessoresRepository = new FakeProfessoresRepository();
    fakeUsuariosRepository = new FakeUsuariosRepository();
    createProfessor = new CreateProfessorService(
      fakeUsuariosRepository,
      fakeProfessoresRepository,
    );
    createUsuario = new CreateUsuarioService(
      fakeUsuariosRepository,
      fakeHashProvider,
    );
  });

  it('deve ser possível criar um novo professor', async () => {
    const professor = await createProfessor.execute({
      id_laboratorio: '1',
      id_curso: '1',
      email: 'teste@gmail.com',
      senha: '123456',
      id_nivel: '1',
      nome: 'Teste',
    });

    expect(professor).toHaveProperty('id');
  });

  it('não deve ser possível criar um novo professor se não conseguir criar um usuário', async () => {
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
