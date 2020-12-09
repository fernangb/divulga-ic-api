interface Request {
  email: string;
  senha: string;
}

class AuthenticateAlunoService {
  public async execute({ email, senha }: Request): Promise<void> {}
}

export default AuthenticateAlunoService;
