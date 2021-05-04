import { container } from 'tsyringe';
import ManualVagasProvider from './VagasProvider/implementations/ManualVagasProvider';
import IVagasProvider from './VagasProvider/models/IVagasProvider';

container.registerSingleton<IVagasProvider>(
  'VagasProvider',
  ManualVagasProvider,
);
