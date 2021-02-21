import AppError from '@shared/errors/AppError';

import FakeUsuariosRepository from '../repositories/fakes/FakeUsuariosRepository';
import ShowPerfilService from './ShowPerfilService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let showPerfil: ShowPerfilService;

describe('ShowPerfil', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();

    showPerfil = new ShowPerfilService(fakeUsuariosRepository);
  });

  it('deve ser possível mostrar o perfil', async () => {
    const usuario = await fakeUsuariosRepository.create({
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: '123456',
      id_nivel: '1',
    });

    const perfil = await showPerfil.execute({
      id_usuario: usuario.id,
    });

    expect(perfil.nome).toBe('John Doe');
    expect(perfil.email).toBe('johndoe@example.com');
  });

  it('não deve ser possível mostrar o perfil de um usuário que não existe', async () => {
    await expect(
      showPerfil.execute({
        id_usuario: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
