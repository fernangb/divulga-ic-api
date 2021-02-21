/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsuariosRepository from '../repositories/fakes/FakeUsuariosRepository';
import FakeTokensUsuarioRepository from '../repositories/fakes/FakeTokensUsuarioRepository';

import ResetarSenhaService from './ResetarSenhaService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsuariosRepository: FakeUsuariosRepository;
let fakeTokensUsuarioRepository: FakeTokensUsuarioRepository;
let fakeHashProvider: FakeHashProvider;
let resetarSenha: ResetarSenhaService;

describe('ResetarSenhaService', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    fakeTokensUsuarioRepository = new FakeTokensUsuarioRepository();
    fakeHashProvider = new FakeHashProvider();
    resetarSenha = new ResetarSenhaService(
      fakeUsuariosRepository,
      fakeTokensUsuarioRepository,
      fakeHashProvider,
    );
  });

  it('deve ser possível resetar uma senha', async () => {
    const usuario = await fakeUsuariosRepository.create({
      email: 'fulano@detal.com',
      senha: '123456',
      id_nivel: '1',
      nome: 'Teste',
    });

    const { token } = await fakeTokensUsuarioRepository.gerarToken(usuario.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'gerarHash');

    await resetarSenha.execute({
      senha: '123123',
      token,
    });

    const usuarioAtualizado = await fakeUsuariosRepository.encontrarPeloId(
      usuario.id,
    );

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(usuarioAtualizado?.senha).toBe('123123');
  });

  it('não deve ser possível resetar uma senha com um token que não existe', async () => {
    await expect(
      resetarSenha.execute({ token: 'token-invalido', senha: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível resetar uma senha com um usuário que não existe', async () => {
    const { token } = await fakeTokensUsuarioRepository.gerarToken(
      'usuario-invalido',
    );

    await expect(
      resetarSenha.execute({ token, senha: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser possível resetar uma senha com um token gerado há mais de 2 horas atrás', async () => {
    const usuario = await fakeUsuariosRepository.create({
      email: 'fulano@detal.com',
      senha: '123456',
      id_nivel: '1',
      nome: 'Teste',
    });

    const { token } = await fakeTokensUsuarioRepository.gerarToken(usuario.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const novaData = new Date();

      return novaData.setHours(novaData.getHours() + 3);
    });

    await expect(
      resetarSenha.execute({
        senha: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
