import { Router } from 'express';
import alunosRouter from '@modules/alunos/infra/http/routes/alunos.routes';
import areasRouter from '@modules/areas/infra/http/routes/areas.routes';
import campusRouter from '@modules/campus/infra/http/routes/campus.routes';
import cursosRouter from '@modules/cursos/infra/http/routes/cursos.routes';
import niveisRouter from '@modules/usuarios/infra/http/routes/niveis.routes';
import perfilRouter from '@modules/usuarios/infra/http/routes/perfil.routes';
import prediosRouter from '@modules/predios/infra/http/routes/predios.routes';
import sessionsRouter from '@modules/usuarios/infra/http/routes/sessions.routes';
import usuariosRouter from '@modules/usuarios/infra/http/routes/usuarios.routes';
import senhaRouter from '@modules/usuarios/infra/http/routes/senha.routes';
import laboratoriosRouter from '@modules/laboratorios/infra/http/routes/laboratorios.routes';
import professoresRouter from '@modules/professores/infra/http/routes/professores.routes';
import vagasIcRouter from '@modules/vagas_ic/infra/http/routes/vagas_ic.routes';

const routes = Router();

routes.use('/alunos', alunosRouter);
routes.use('/areas', areasRouter);
routes.use('/campus', campusRouter);
routes.use('/cursos', cursosRouter);
routes.use('/niveis', niveisRouter);
routes.use('/perfil', perfilRouter);
routes.use('/predios', prediosRouter);
routes.use('/senha', senhaRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/usuarios', usuariosRouter);
routes.use('/laboratorios', laboratoriosRouter);
routes.use('/professores', professoresRouter);
routes.use('/vagas_ic', vagasIcRouter);

export default routes;
