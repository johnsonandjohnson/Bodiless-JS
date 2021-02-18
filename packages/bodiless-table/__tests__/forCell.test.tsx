import {
  isEvenRow,
  isOddRow,
  isFirstRow,
  isLastRow,
  isEvenColumn,
  isLastColumn,
  isFirstColumn,
  isOddColumn,
  isInBody,
  isInFoot,
  isInHead,
} from '../src/forCell';
import { Section } from '../src/types';
import testCellProp from './testCellProp';

describe('ForCell HelperFunctions', () => {
  describe('isEvenRow', () => {
    test('returns true if Row is even', () => {
      expect(isEvenRow(testCellProp({ rowIndex: 1 }))).toBeTruthy();
    });
    test('returns false if Row is ode', () => {
      expect(isEvenRow(testCellProp({ rowIndex: 2 }))).toBeFalsy();
    });
  });
  describe('isOddRow', () => {
    test('returns true if Row is odd', () => {
      expect(isOddRow(testCellProp({ rowIndex: 2 }))).toBeTruthy();
    });
    test('returns false if Row is even', () => {
      expect(isOddRow(testCellProp({ rowIndex: 1 }))).toBeFalsy();
    });
  });
  describe('isFirstRow', () => {
    test('returns true if Row is first', () => {
      expect(isFirstRow(testCellProp({ rowIndex: 0 }))).toBeTruthy();
    });
    test('returns false if Row is not first', () => {
      expect(isFirstRow(testCellProp({ rowIndex: 1 }))).toBeFalsy();
    });
  });
  describe('isLastRow', () => {
    test('returns true if Row is last', () => {
      expect(isLastRow(testCellProp({ rowIndex: 2 }))).toBeTruthy();
    });
    test('returns false if Row is not last', () => {
      expect(isFirstRow(testCellProp({ rowIndex: 1 }))).toBeFalsy();
    });
  });
  describe('isEvenColumn', () => {
    test('returns true if Column is even', () => {
      expect(isEvenColumn(testCellProp({ columnIndex: 1 }))).toBeTruthy();
    });
    test('returns false if Column is ode', () => {
      expect(isEvenColumn(testCellProp({ columnIndex: 2 }))).toBeFalsy();
    });
  });
  describe('isOddColumn', () => {
    test('returns true if Column is odd', () => {
      expect(isOddColumn(testCellProp({ columnIndex: 2 }))).toBeTruthy();
    });
    test('returns false if Column is even', () => {
      expect(isOddColumn(testCellProp({ columnIndex: 1 }))).toBeFalsy();
    });
  });
  describe('isFirstColumn', () => {
    test('returns true if Column is first', () => {
      expect(isFirstColumn(testCellProp({ columnIndex: 0 }))).toBeTruthy();
    });
    test('returns false if Column is not first', () => {
      expect(isFirstColumn(testCellProp({ columnIndex: 1 }))).toBeFalsy();
    });
  });
  describe('isLastColumn', () => {
    test('returns true if Column is last', () => {
      expect(isLastColumn(testCellProp({ columnIndex: 2 }))).toBeTruthy();
    });
    test('returns false if Column is not last', () => {
      expect(isFirstColumn(testCellProp({ columnIndex: 1 }))).toBeFalsy();
    });
  });
  describe('isInHead', () => {
    test('returns true if item is in the head', () => {
      expect(isInHead(testCellProp({ section: Section.head }))).toBeTruthy();
    });
    test('returns false if item is in the body', () => {
      expect(isInHead(testCellProp({ section: Section.body }))).toBeFalsy();
    });
    test('returns false if item is in the foot', () => {
      expect(isInHead(testCellProp({ section: Section.foot }))).toBeFalsy();
    });
  });
  describe('isInBody', () => {
    test('returns false if item is in the head', () => {
      expect(isInBody(testCellProp({ section: Section.head }))).toBeFalsy();
    });
    test('returns true if item is in the body', () => {
      expect(isInBody(testCellProp({ section: Section.body }))).toBeTruthy();
    });
    test('returns false if item is in the foot', () => {
      expect(isInBody(testCellProp({ section: Section.foot }))).toBeFalsy();
    });
  });
  describe('isInFoot', () => {
    test('returns false if item is in the head', () => {
      expect(isInFoot(testCellProp({ section: Section.head }))).toBeFalsy();
    });
    test('returns false if item is in the body', () => {
      expect(isInFoot(testCellProp({ section: Section.body }))).toBeFalsy();
    });
    test('returns true if item is in the foot', () => {
      expect(isInFoot(testCellProp({ section: Section.foot }))).toBeTruthy();
    });
  });
});
