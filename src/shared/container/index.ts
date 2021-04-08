import { container } from 'tsyringe';
import '@modules/usuarios/providers';
import './providers';

import IAlunosRepository from '@modules/alunos/repositories/IAlunosRepository';
import AlunosRepository from '@modules/alunos/infra/typeorm/repositories/AlunosRepository';
import IAreasRepository from '@modules/areas/repositories/IAreasRepository';
import AreasRepository from '@modules/areas/infra/typeorm/repositories/AreasRepository';
import ICursosRepository from '@modules/cursos/repositories/ICursosRepository';
import CursosRepository from '@modules/cursos/infra/typeorm/repositories/CursosRepository';
import IPrediosRepository from '@modules/predios/repositories/IPrediosRepository';
import PrediosRepository from '@modules/predios/infra/typeorm/repositories/PrediosRepository';
import INiveisRepository from '@modules/usuarios/repositories/INiveisRepository';
import NiveisRepository from '@modules/usuarios/infra/typeorm/repositories/NiveisRepository';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import UsuariosRepository from '@modules/usuarios/infra/typeorm/repositories/UsuariosRepository';
import ITokensUsuarioRepository from '@modules/usuarios/repositories/ITokensUsuarioRepository';
import TokensUsuarioRepository from '@modules/usuarios/infra/typeorm/repositories/TokensUsuarioRepository';
import ILaboratoriosRepository from '@modules/laboratorios/repositories/ILaboratoriosRepository';
import LaboratoriosRepository from '@modules/laboratorios/infra/typeorm/repositories/LaboratoriosRepository';
import ProfessoresRepository from '@modules/professores/infra/typeorm/repositories/ProfessoresRepository';
import IProfessoresRepository from '@modules/professores/repositories/IProfessoresRepository';
import IVagasIcRepository from '@modules/vagas_ic/repositories/IVagasIcRepository';
import VagasIcRepository from '@modules/vagas_ic/infra/typeorm/repositories/VagasIcRepository';
import IInscricoesIcRepository from '@modules/vagas_ic/repositories/IInscricoesIcRepository';
import InscricoesIcRepository from '@modules/vagas_ic/infra/typeorm/repositories/InscricoesIcRepository';


container.registerSingleton<IAreasRepository>(
  'AreasRepository',
  AreasRepository,
);

container.registerSingleton<ICursosRepository>(
  'CursosRepository',
  CursosRepository,
);

container.registerSingleton<IPrediosRepository>(
  'PrediosRepository',
  PrediosRepository,
);

container.registerSingleton<INiveisRepository>(
  'NiveisRepository',
  NiveisRepository,
);

container.registerSingleton<IUsuariosRepository>(
  'UsuariosRepository',
  UsuariosRepository,
);

container.registerSingleton<ITokensUsuarioRepository>(
  'TokensUsuarioRepository',
  TokensUsuarioRepository,
);

container.registerSingleton<IAlunosRepository>(
  'AlunosRepository',
  AlunosRepository,
);

container.registerSingleton<ILaboratoriosRepository>(
  'LaboratoriosRepository',
  LaboratoriosRepository,
);

container.registerSingleton<IProfessoresRepository>(
  'ProfessoresRepository',
  ProfessoresRepository,
);

container.registerSingleton<IVagasIcRepository>(
  'VagasIcRepository',
  VagasIcRepository,
);

container.registerSingleton<IInscricoesIcRepository>(
  'InscricoesIcRepository',
  InscricoesIcRepository,
);
