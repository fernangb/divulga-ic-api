import { container } from 'tsyringe';
import ManualAlunoProvider from './AlunoProvider/implementations/ManualAlunoProvider';
import IAlunoProvider from './AlunoProvider/models/IAlunoProvider';

container.registerSingleton<IAlunoProvider>(
  'AlunoProvider',
  ManualAlunoProvider,
);
