/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'reflect-metadata';

import FakeAreasRepository from '../repositories/fakes/FakeAreasRepository';
import CreateAreaService from './CreateAreaService';

describe('CreateArea', () => {
  it('deve ser possível criar uma nova área', async () => {
    const fakeAreasRepository = new FakeAreasRepository();
    const createArea = new CreateAreaService(fakeAreasRepository);

    const area = await createArea.execute({ nome: 'Teste' });

    expect(area).toHaveProperty('id');
  });

  // it('não deve ser permitido criar duas áreas com o mesmo nome', () => {
  //   expect(1 + 2).toBe(3);
  // });
});
