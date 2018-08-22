import { PromoteModule } from './promote.module';

describe('PromoteModule', () => {
  let promoteModule: PromoteModule;

  beforeEach(() => {
    promoteModule = new PromoteModule();
  });

  it('should create an instance', () => {
    expect(promoteModule).toBeTruthy();
  });
});
