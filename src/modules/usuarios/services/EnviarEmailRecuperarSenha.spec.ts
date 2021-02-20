/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'reflect-metadata';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsuariosRepository from '../repositories/fakes/FakeUsuariosRepository';
import FakeTokensUsuarioRepository from '../repositories/fakes/FakeTokensUsuarioRepository';

import EnviarEmailRecuperarSenhaService from './EnviarEmailRecuperarSenhaService';

let fakeUsuariosRepository: FakeUsuariosRepository;
let fakeMailProvider: FakeMailProvider;
let fakeTokensUsuarioRepository: FakeTokensUsuarioRepository;
let enviarEmailRecuperarSenha: EnviarEmailRecuperarSenhaService;

describe('EnviarEmailRecuperarSenha', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeTokensUsuarioRepository = new FakeTokensUsuarioRepository();
    enviarEmailRecuperarSenha = new EnviarEmailRecuperarSenhaService(
      fakeUsuariosRepository,
      fakeMailProvider,
      fakeTokensUsuarioRepository,
    );
  });

  it('deve ser possível recuperar a senha usando um email', async () => {
    const enviarEmail = jest.spyOn(fakeMailProvider, 'enviarEmail');

    await fakeUsuariosRepository.create({
      email: 'teste@teste.com',
      senha: '123456',
      id_nivel: '1',
    });

    await enviarEmailRecuperarSenha.execute({
      email: 'teste@teste.com',
    });

    expect(enviarEmail).toHaveBeenCalled();
  });

  it('não deve ser possível recuperar uma senha de um usuário que não existe', async () => {
    await expect(
      enviarEmailRecuperarSenha.execute({
        email: 'fulano@detal.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('deve gerar um token de esqueci minha senha', async () => {
    const gerarToken = jest.spyOn(fakeTokensUsuarioRepository, 'gerarToken');

    const usuario = await fakeUsuariosRepository.create({
      email: 'teste@teste.com',
      senha: '123456',
      id_nivel: '1',
    });

    await enviarEmailRecuperarSenha.execute({
      email: 'teste@teste.com',
    });

    expect(gerarToken).toHaveBeenCalledWith(usuario.id);
  });
});
