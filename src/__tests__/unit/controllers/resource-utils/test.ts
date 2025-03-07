import { createResource } from '../../../../controllers/resource-utils';
import { DEFAULT_CACHE_MAX_LIMIT } from '../../../../controllers/resource-store/constants';

describe('resource utils', () => {
  describe('createResource', () => {
    it('should return a resource object', async () => {
      const resource = createResource({
        type: 'TEST',
        getKey: () => '',
        getData: () => null,
      });

      expect(resource).toEqual({
        type: expect.any(String),
        getKey: expect.any(Function),
        getData: expect.any(Function),
        maxAge: 0,
        maxCache: DEFAULT_CACHE_MAX_LIMIT,
      });
    });

    it('should return a resource object with getData loader', async () => {
      const getDataMock = jest.fn();
      const routerContext: any = {};

      const resource = createResource({
        type: 'TEST',
        getKey: () => '',
        getDataLoader: () => Promise.resolve({ default: getDataMock }),
      });

      expect(resource).toEqual({
        type: expect.any(String),
        getKey: expect.any(Function),
        getData: expect.any(Function),
        maxAge: 0,
        maxCache: DEFAULT_CACHE_MAX_LIMIT,
      });

      await resource.getData(routerContext, {});
      expect(getDataMock).toHaveBeenCalled();
    });

    it('should return a resource object with a custom maxAge', async () => {
      const resource = createResource({
        type: 'TEST',
        getKey: () => '',
        getData: () => null,
        maxAge: 400,
      });

      expect(resource).toEqual({
        type: expect.any(String),
        getKey: expect.any(Function),
        getData: expect.any(Function),
        maxAge: 400,
        maxCache: DEFAULT_CACHE_MAX_LIMIT,
      });
    });

    it('should return a resource object with a custom maxCache limit', async () => {
      const resource = createResource({
        type: 'TEST',
        getKey: () => '',
        getData: () => null,
        maxAge: 0,
        maxCache: 3,
      });

      expect(resource).toEqual({
        type: expect.any(String),
        getKey: expect.any(Function),
        getData: expect.any(Function),
        maxAge: 0,
        maxCache: 3,
      });
    });
  });
});
