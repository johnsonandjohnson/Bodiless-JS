import { v1 } from 'uuid';

const itemHandlers = {
  getItems: jest.fn(),
  setItems: jest.fn(),
};
const flexboxDataHandlers = {
  insertFlexboxItem: jest.fn(() => ({ uuid: v1() })),
  deleteFlexboxItem: jest.fn(),
  updateFlexboxItem: jest.fn(),
};
export const useItemHandlers = () => itemHandlers;
export const useFlexboxDataHandlers = () => flexboxDataHandlers;
