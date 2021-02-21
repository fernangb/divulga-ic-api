import { container } from 'tsyringe';
import '@modules/usuarios/providers';
import './providers';

import IAlunosRepository from '@modules/alunos/repositories/IAlunosRepository';
import AlunosRepository from '@modules/alunos/infra/typeorm/repositories/AlunosRepository';
import IAreasRepository from '@modules/areas/repositories/IAreasRepository';
import AreasRepository from '@modules/areas/infra/typeorm/repositories/AreasRepository';
import ICampusRepository from '@modules/campus/repositories/ICampusRepository';
import CampusRepository from '@modules/campus/infra/typeorm/repositories/CampusRepository';
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

container.registerSingleton<IAreasRepository>(
  'AreasRepository',
  AreasRepository,
);

container.registerSingleton<ICampusRepository>(
  'CampusRepository',
  CampusRepository,
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
