/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'reflect-metadata';

import FakeUsuariosRepository from '../repositories/fakes/FakeUsuariosRepository';
import FakeTokensUsuarioRepository from '../repositories/fakes/FakeTokensUsuarioRepository';

import ResetarSenhaService from './ResetarSenhaService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let fakeTokensUsuarioRepository: FakeTokensUsuarioRepository;
let resetarSenha: ResetarSenhaService;

describe('ResetarSenha', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    fakeTokensUsuarioRepository = new FakeTokensUsuarioRepository();
    resetarSenha = new ResetarSenhaService(
      fakeUsuariosRepository,
      fakeTokensUsuarioRepository,
    );
  });

  it('deve ser possível resetar uma senha', async () => {
    const usuario = await fakeUsuariosRepository.create({
      email: 'fulano@detal.com',
      senha: '123456',
      id_nivel: '1',
    });

    const { token } = await fakeTokensUsuarioRepository.gerarToken(usuario.id);

    // const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetarSenha.execute({
      senha: '123123',
      token,
    });

    const usuarioAtualizado = await fakeUsuariosRepository.encontrarPeloId(
      usuario.id,
    );

    // expect(generateHash).toHaveBeenCalledWith('123123');
    expect(usuarioAtualizado?.senha).toBe('123123');
  });
});
