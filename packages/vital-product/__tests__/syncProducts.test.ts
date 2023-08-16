const readDirMock = jest.fn();
const rmMock = jest.fn();
const existSyncMock = jest.fn();
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  readdirSync: readDirMock,
  promises: { ...jest.requireActual('fs').promises, rm: rmMock },
  rm: rmMock,
}));

// eslint-disable-next-line import/first
import { syncProducts } from '../src/scripts/products';

describe('Sync products', () => {
  it('should delete products that are not present', () => {
    readDirMock.mockReturnValue(['bca', 'cda']);
    syncProducts(['abc', 'bca'], '/pages/products');
    expect(readDirMock).toHaveBeenCalledWith(
      expect.stringContaining('/pages/products'),
    );

    expect(rmMock).toHaveBeenCalledWith(
      expect.stringContaining('/pages/products/cda'),
      { recursive: true },
    );
  });
});
