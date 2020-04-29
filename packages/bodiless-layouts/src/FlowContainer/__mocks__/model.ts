import { v1 } from 'uuid';

const itemHandlers = {
  getItems: jest.fn(),
  setItems: jest.fn(),
};
const flowContainerDataHandlers = {
  insertFlowContainerItem: jest.fn(() => ({ uuid: v1() })),
  deleteFlowContainerItem: jest.fn(),
  updateFlowContainerItem: jest.fn(),
};
export const useItemHandlers = () => itemHandlers;
export const useFlowContainerDataHandlers = () => flowContainerDataHandlers;
