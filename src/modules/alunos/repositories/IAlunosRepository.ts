import ICreateAlunoDTO from '../dtos/ICreateAlunoDTO';
import Aluno from '../infra/typeorm/entities/Aluno';

export default interface IAlunosRepository {
  encontrarPeloId(id: string): Promise<Aluno | undefined>;
  encontrarPeloIdUsuario(id_usuario: string): Promise<Aluno | undefined>;
  encontrarPeloDRE(dre: string): Promise<Aluno | undefined>;
  validarDRE(dre: string): boolean;
  validarPeriodo(periodo: number): boolean;
  validarCR(periodo: number): boolean;
  create(data: ICreateAlunoDTO): Promise<Aluno>;
  save(usuario: Aluno): Promise<Aluno>;
}
