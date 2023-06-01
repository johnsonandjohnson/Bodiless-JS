/**
 * We must export the token collection directly from the module in which it is defined,
 * not from /tokens. This verison of the token will never be shadowed.
 */
export { default as exampleButtonsBase } from '../components/Buttons/tokens/exampleButtons';
