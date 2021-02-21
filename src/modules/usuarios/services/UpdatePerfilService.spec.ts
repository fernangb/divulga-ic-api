import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import UpdatePerfilService from './UpdatePerfilService';
import FakeUsuariosRepository from '../repositories/fakes/FakeUsuariosRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsuariosRepository: FakeUsuariosRepository;
let fakeHashProvider: FakeHashProvider;
let updatePerfil: UpdatePerfilService;

describe('UpdatePerfil', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    fakeHashProvider = new FakeHashProvider();
    updatePerfil = new UpdatePerfilService(
      fakeUsuariosRepository,
      fakeHashProvider,
    );
  });

  it('deve ser possivel atualizar um perfil de usuário', async () => {
    const usuario = await fakeUsuariosRepository.create({
      email: 'fulano@detal.com',
      senha: '123456',
      id_nivel: '1',
      nome: 'Teste',
    });

    const usuarioAtualizado = await updatePerfil.execute({
      id_usuario: usuario.id,
      nome: 'Novo Teste',
      email: 'novoFulano@detal.com',
    });

    expect(usuarioAtualizado?.nome).toBe('Novo Teste');
    expect(usuarioAtualizado?.email).toBe('novoFulano@detal.com');
  });

  it('não deve ser possível atualizar o perfil de um usuário que não existe', async () => {
    await expect(
      updatePerfil.execute({
        id_usuario: 'non-existing-user-id',
        nome: 'Test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar a senha de um outro email de usuário', async () => {
    await fakeUsuariosRepository.create({
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: '123456',
      id_nivel: '1',
    });

    const user = await fakeUsuariosRepository.create({
      nome: 'Test',
      email: 'test@example.com',
      senha: '123456',
      id_nivel: '1',
    });

    await expect(
      updatePerfil.execute({
        id_usuario: user.id,
        nome: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('deve ser possível atualizar a senha', async () => {
    const user = await fakeUsuariosRepository.create({
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: '123456',
      id_nivel: '1',
    });

    const usuarioAtualizado = await updatePerfil.execute({
      id_usuario: user.id,
      nome: 'John Trê',
      email: 'johntre@example.com',
      senha_antiga: '123456',
      senha: '123123',
    });

    expect(usuarioAtualizado?.senha).toBe('123123');
  });

  it('não deve ser possível atualizar a senha sem a senha antiga', async () => {
    const usuario = await fakeUsuariosRepository.create({
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: '123456',
      id_nivel: '1',
    });

    await expect(
      updatePerfil.execute({
        id_usuario: usuario.id,
        nome: 'John Trê',
        email: 'johntre@example.com',
        senha: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível atualizar a senha com a senha entiga errada', async () => {
    const user = await fakeUsuariosRepository.create({
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: '123456',
      id_nivel: '1',
    });

    await expect(
      updatePerfil.execute({
        id_usuario: user.id,
        nome: 'John Trê',
        email: 'johntre@example.com',
        senha_antiga: 'wrong-old-password',
        senha: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
