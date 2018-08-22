import { PlacedataModule } from './placedata.module';

describe('PlacedataModule', () => {
  let placedataModule: PlacedataModule;

  beforeEach(() => {
    placedataModule = new PlacedataModule();
  });

  it('should create an instance', () => {
    expect(placedataModule).toBeTruthy();
  });
});
