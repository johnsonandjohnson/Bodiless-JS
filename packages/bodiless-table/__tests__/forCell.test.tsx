import { Fragment } from '@bodiless/fclasses';
import { flow } from 'lodash';
import { renderHook } from '@testing-library/react-hooks';
import {
  useIsEvenRow,
  useIsOddRow,
  useIsFirstRow,
  useIsLastRow,
  useIsEvenColumn,
  useIsLastColumn,
  useIsFirstColumn,
  useIsOddColumnn,
  useIsInBody,
  useIsInFoot,
  useIsInHead,
} from '../src/forCell';
import TableContext, {
  TableColumnContext,
  TableRowContext,
  TableSectionContext,
} from '../src/TableContext';
import { Section } from '../src/types';
import withContextValue from './withContextValue';

describe('ForCell HelperFunctions', () => {
  describe('useIsEvenRow', () => {
    test('returns true if Row is even', () => {
      const wrapper = withContextValue(TableRowContext)({ index: 1, name: '' })(Fragment);
      const { result } = renderHook(useIsEvenRow, { wrapper });
      expect(result.current).toBeTruthy();
    });
    test('returns false if Row is odd', () => {
      const wrapper = withContextValue(TableRowContext)({ index: 2, name: '' })(Fragment);
      const { result } = renderHook(useIsEvenRow, { wrapper });
      expect(result.current).toBeFalsy();
    });
  });
  describe('useIsOddRow', () => {
    test('returns true if Row is odd', () => {
      const wrapper = withContextValue(TableRowContext)({ index: 2, name: '' })(Fragment);
      const { result } = renderHook(useIsOddRow, { wrapper });
      expect(result.current).toBeTruthy();
    });
    test('returns false if Row is even', () => {
      const wrapper = withContextValue(TableRowContext)({ index: 1, name: '' })(Fragment);
      const { result } = renderHook(useIsOddRow, { wrapper });
      expect(result.current).toBeFalsy();
    });
  });
  describe('useIsFirstRow', () => {
    test('returns true if Row is first', () => {
      const wrapper = withContextValue(TableRowContext)({ index: 0, name: '' })(Fragment);
      const { result } = renderHook(useIsFirstRow, { wrapper });
      expect(result.current).toBeTruthy();
    });
    test('returns false if Row is not first', () => {
      const wrapper = withContextValue(TableRowContext)({ index: 1, name: '' })(Fragment);
      const { result } = renderHook(useIsFirstRow, { wrapper });
      expect(result.current).toBeFalsy();
    });
  });
  describe('useIsLastRow', () => {
    test('returns true if Row is last', () => {
      const wrapper = flow(
        withContextValue(TableContext)({
          rows: ['0', '1'],
          columns: [],
          headRows: [],
          footRows: [],
        }),
        withContextValue(TableRowContext)({ index: 1, name: '' }),
      )(Fragment);
      const { result } = renderHook(useIsLastRow, { wrapper });
      expect(result.current).toBeTruthy();
    });
    test('returns false if Row is not last', () => {
      const wrapper = flow(
        withContextValue(TableContext)({
          rows: ['0', '1'],
          columns: [],
          headRows: [],
          footRows: [],
        }),
        withContextValue(TableRowContext)({ index: 0, name: '' }),
      )(Fragment);
      const { result } = renderHook(useIsLastRow, { wrapper });
      expect(result.current).toBeFalsy();
    });
  });
  describe('useIsEvenColumn', () => {
    test('returns true if Column is even', () => {
      const wrapper = withContextValue(TableColumnContext)({ index: 1, name: '' })(Fragment);
      const { result } = renderHook(useIsEvenColumn, { wrapper });
      expect(result.current).toBeTruthy();
    });
    test('returns false if Column is odd', () => {
      const wrapper = withContextValue(TableColumnContext)({ index: 2, name: '' })(Fragment);
      const { result } = renderHook(useIsEvenColumn, { wrapper });
      expect(result.current).toBeFalsy();
    });
  });
  describe('useIsOddColumnn', () => {
    test('returns true if Column is odd', () => {
      const wrapper = withContextValue(TableColumnContext)({ index: 0, name: '' })(Fragment);
      const { result } = renderHook(useIsOddColumnn, { wrapper });
      expect(result.current).toBeTruthy();
    });
    test('returns false if Column is even', () => {
      const wrapper = withContextValue(TableColumnContext)({ index: 1, name: '' })(Fragment);
      const { result } = renderHook(useIsOddColumnn, { wrapper });
      expect(result.current).toBeFalsy();
    });
  });
  describe('useIsFirstColumn', () => {
    test('returns true if Column is first', () => {
      const wrapper = flow(
        withContextValue(TableContext)({
          rows: [],
          columns: ['0', '1'],
          headRows: [],
          footRows: [],
        }),
        withContextValue(TableColumnContext)({ index: 0, name: '' }),
      )(Fragment);
      const { result } = renderHook(useIsFirstColumn, { wrapper });
      expect(result.current).toBeTruthy();
    });
    test('returns false if Column is not first', () => {
      const wrapper = flow(
        withContextValue(TableContext)({
          rows: [],
          columns: ['0', '1'],
          headRows: [],
          footRows: [],
        }),
        withContextValue(TableColumnContext)({ index: 1, name: '' }),
      )(Fragment);
      const { result } = renderHook(useIsFirstColumn, { wrapper });
      expect(result.current).toBeFalsy();
    });
  });
  describe('useIsLastColumn', () => {
    test('returns true if Column is last', () => {
      const wrapper = flow(
        withContextValue(TableContext)({
          rows: [],
          columns: ['0', '1'],
          headRows: [],
          footRows: [],
        }),
        withContextValue(TableColumnContext)({ index: 1, name: '' }),
      )(Fragment);
      const { result } = renderHook(useIsLastColumn, { wrapper });
      expect(result.current).toBeTruthy();
    });
    test('returns false if Column is not last', () => {
      const wrapper = flow(
        withContextValue(TableContext)({
          rows: [],
          columns: ['0', '1'],
          headRows: [],
          footRows: [],
        }),
        withContextValue(TableColumnContext)({ index: 0, name: '' }),
      )(Fragment);
      const { result } = renderHook(useIsLastColumn, { wrapper });
      expect(result.current).toBeFalsy();
    });
  });
  describe('useIsInHead', () => {
    test('returns true if item is in the head', () => {
      const wrapper = withContextValue(TableSectionContext)(Section.head)(Fragment);
      const { result } = renderHook(useIsInHead, { wrapper });
      expect(result.current).toBeTruthy();
    });
    test('returns false if item is in the body', () => {
      const wrapper = withContextValue(TableSectionContext)(Section.body)(Fragment);
      const { result } = renderHook(useIsInHead, { wrapper });
      expect(result.current).toBeFalsy();
    });
    test('returns false if item is in the foot', () => {
      const wrapper = withContextValue(TableSectionContext)(Section.foot)(Fragment);
      const { result } = renderHook(useIsInHead, { wrapper });
      expect(result.current).toBeFalsy();
    });
  });
  describe('useIsInBody', () => {
    test('returns false if item is in the head', () => {
      const wrapper = withContextValue(TableSectionContext)(Section.head)(Fragment);
      const { result } = renderHook(useIsInBody, { wrapper });
      expect(result.current).toBeFalsy();
    });
    test('returns true if item is in the body', () => {
      const wrapper = withContextValue(TableSectionContext)(Section.body)(Fragment);
      const { result } = renderHook(useIsInBody, { wrapper });
      expect(result.current).toBeTruthy();
    });
    test('returns false if item is in the foot', () => {
      const wrapper = withContextValue(TableSectionContext)(Section.foot)(Fragment);
      const { result } = renderHook(useIsInBody, { wrapper });
      expect(result.current).toBeFalsy();
    });
  });
  describe('useIsInFoot', () => {
    test('returns false if item is in the head', () => {
      const wrapper = withContextValue(TableSectionContext)(Section.head)(Fragment);
      const { result } = renderHook(useIsInFoot, { wrapper });
      expect(result.current).toBeFalsy();
    });
    test('returns false if item is in the body', () => {
      const wrapper = withContextValue(TableSectionContext)(Section.body)(Fragment);
      const { result } = renderHook(useIsInFoot, { wrapper });
      expect(result.current).toBeFalsy();
    });
    test('returns true if item is in the foot', () => {
      const wrapper = withContextValue(TableSectionContext)(Section.foot)(Fragment);
      const { result } = renderHook(useIsInFoot, { wrapper });
      expect(result.current).toBeTruthy();
    });
  });
});
