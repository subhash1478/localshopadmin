import { ProductcategoryModule } from './productcategory.module';

describe('ProductcategoryModule', () => {
  let productcategoryModule: ProductcategoryModule;

  beforeEach(() => {
    productcategoryModule = new ProductcategoryModule();
  });

  it('should create an instance', () => {
    expect(productcategoryModule).toBeTruthy();
  });
});
