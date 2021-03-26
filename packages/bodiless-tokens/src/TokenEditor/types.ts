import { ComponentType } from 'react';
import { Token, DesignableComponentsProps } from '@bodiless/fclasses';

/**
 * Defines a component which can be added to a Token Editor
 */
export type TokenEditorComponentDef = {
  /**
   * The name of the component. Used to create the design key of the component
   * within the editor, and for various titles.
   */
  name?: string;
  /**
   * The component to add.
   */
  Component: ComponentType<any>;
  /**
   * An object listing the tokens which will be available to apply to the component.
   * The keys are token names (used to generate checkboxes and to produce code
   * snippets).  The values are the tokens themselvs.
   */
  tokens: { [key: string]: Token<any>; };
};

export type TokenEditorComponents = {
  Wrapper: ComponentType<any>,
  Title: ComponentType<any>,
  Container: ComponentType<any>,
  DetailsWrapper: ComponentType<any>,
  DetailsTitle: ComponentType<any>,
  DetailsBody: ComponentType<any>
  Printer: ComponentType<any>,
};

export type TokenEditorProps = DesignableComponentsProps<TokenEditorComponents>;
