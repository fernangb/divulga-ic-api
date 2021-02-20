import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateAvatarUsuarioService from './UpdateAvatarUsuarioService';
import FakeUsuariosRepository from '../repositories/fakes/FakeUsuariosRepository';

describe('UpdateAvatarUsuario', () => {
  it('deve ser possivel atualizar um usuário', async () => {
    const fakeUsuariosRepository = new FakeUsuariosRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUsuarioAvatar = new UpdateAvatarUsuarioService(
      fakeUsuariosRepository,
      fakeStorageProvider,
    );

    const usuario = await fakeUsuariosRepository.create({
      email: 'fulano@detal.com',
      senha: '123456',
      id_nivel: '1',
    });

    await updateUsuarioAvatar.execute({
      id_usuario: usuario.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(usuario.avatar).toBe('avatar.jpg');
  });

  it('não deve ser possível atualizar um avatar de um usuário que não existe', async () => {
    const fakeUsuariosRepository = new FakeUsuariosRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUsuarioAvatar = new UpdateAvatarUsuarioService(
      fakeUsuariosRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUsuarioAvatar.execute({
        id_usuario: 'non-existing-usuario',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('deve ser posível deletar um avatar antigo quando eu atualizá-lo', async () => {
    const fakeUsuariosRepository = new FakeUsuariosRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deletarArquivo');

    const updateUsuarioAvatar = new UpdateAvatarUsuarioService(
      fakeUsuariosRepository,
      fakeStorageProvider,
    );

    const usuario = await fakeUsuariosRepository.create({
      email: 'fulano@detal.com',
      senha: '123456',
      id_nivel: '1',
    });

    await updateUsuarioAvatar.execute({
      id_usuario: usuario.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUsuarioAvatar.execute({
      id_usuario: usuario.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(usuario.avatar).toBe('avatar2.jpg');
  });
});
