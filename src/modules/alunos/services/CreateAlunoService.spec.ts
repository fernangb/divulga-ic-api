/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeUsuariosRepository from '@modules/usuarios/repositories/fakes/FakeUsuariosRepository';
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';
import FakeHashProvider from '@modules/usuarios/providers/HashProvider/fakes/FakeHashProvider';
import FakeAlunosRepository from '../repositories/fakes/FakeAlunosRepository';
import CreateAlunoService from './CreateAlunoService';

let fakeAlunosRepository: FakeAlunosRepository;
let fakeUsuariosRepository: FakeUsuariosRepository;
let fakeHashProvider: FakeHashProvider;
let createAluno: CreateAlunoService;
let createUsuario: CreateUsuarioService;

describe('CreateAluno', () => {
  beforeEach(() => {
    fakeAlunosRepository = new FakeAlunosRepository();
    fakeUsuariosRepository = new FakeUsuariosRepository();
    createAluno = new CreateAlunoService(
      fakeUsuariosRepository,
      fakeAlunosRepository,
    );
    createUsuario = new CreateUsuarioService(
      fakeUsuariosRepository,
      fakeHashProvider,
    );
  });

  it('deve ser possível criar um novo aluno', async () => {
    const aluno = await createAluno.execute({
      dre: '123456789',
      periodo: 3,
      id_curso: '1',
      email: 'teste@gmail.com',
      senha: '123456',
      id_nivel: '1',
      nome: 'Teste',
    });

    expect(aluno).toHaveProperty('id');
  });

  it('não deve ser possível criar um novo aluno com o mesmo dre', async () => {
    await createAluno.execute({
      dre: '123456789',
      periodo: 3,
      id_curso: '1',
      email: 'teste@gmail.com',
      senha: '123456',
      id_nivel: '1',
      nome: 'Teste',
    });

    await expect(
      createAluno.execute({
        dre: '123456789',
        periodo: 3,
        id_curso: '1',
        email: 'teste@gmail.com',
        senha: '123456',
        id_nivel: '1',
        nome: 'Teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível criar um novo aluno se não conseguir criar um usuário', async () => {
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
