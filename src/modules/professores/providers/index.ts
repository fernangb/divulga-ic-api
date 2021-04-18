import { container } from 'tsyringe';
import ManualProfessorProvider from './ProfessorProvider/implementations/ManualProfessorProvider';
import IProfessorProvider from './ProfessorProvider/models/IProfessorProvider';

container.registerSingleton<IProfessorProvider>(
  'ProfessorProvider',
  ManualProfessorProvider,
);
