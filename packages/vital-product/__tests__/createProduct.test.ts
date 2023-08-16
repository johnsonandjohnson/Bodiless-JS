const mockMkdir = jest.fn();
const mockWriteFile = jest.fn();
jest.mock('fs-extra', () => ({
  ...jest.requireActual('fs-extra'),
  writeFile: mockWriteFile,
  mkdirp: mockMkdir,
}));

const { createProduct } = require('../src/scripts/products');

describe('Create product', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should create the directory ', async () => {
    await createProduct(
      { path: 'abcd', contentful_id: 'cfid1' },
      '/pages/products',
    );
    expect(mockMkdir).toHaveBeenCalledWith(
      expect.stringContaining('/pages/products/abcd'),
    );
  });
  it('should call writeFile with indexJson ', async () => {
    await createProduct({ path: 'abcd' }, '/pages/products');
    expect(mockWriteFile).toHaveBeenCalledWith(
      expect.stringContaining('/pages/products/abcd/index.json'),
      JSON.stringify(
        {
          '#template': 'product',
        },
        null,
        2,
      ),
    );
  });
  it('should call writeFile with data path and datajson ', async () => {
    await createProduct(
      { path: 'abcd', contentful_id: 'CFID2' },
      '/pages/products',
    );
    expect(mockWriteFile).toHaveBeenCalledWith(
      expect.stringContaining('/pages/products/abcd/content.json'),
      JSON.stringify(
        {
          contentful_id: 'CFID2',
        },
        null,
        2,
      ),
    );
  });
});
