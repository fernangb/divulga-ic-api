import ICreateAlunoDTO from '../dtos/ICreateAlunoDTO';
import Aluno from '../infra/typeorm/entities/Aluno';

export default interface IAlunosRepository {
  encontrarPeloId(id: string): Promise<Aluno | undefined>;
  encontrarPeloIdUsuario(usuarioId: string): Promise<Aluno | undefined>;
  encontrarPeloDRE(dre: string): Promise<Aluno | undefined>;
  create(data: ICreateAlunoDTO): Promise<Aluno>;
  save(usuario: Aluno): Promise<Aluno>;
}
