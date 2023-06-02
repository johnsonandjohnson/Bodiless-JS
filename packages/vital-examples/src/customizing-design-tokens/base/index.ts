// We must export the token collection directly from the module in which
// it is defined, not from /tokens. This verison of the token will never
// be shadowed.
export { default as exampleTextDecorationBase } from '../components/TextDecoration/tokens/exampleTextDecoration';
export { default as exampleTypographyBase } from '../components/Typography/tokens/exampleTypography';
