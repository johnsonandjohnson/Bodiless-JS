import { Editable } from '@bodiless/components';

// Eventually this can be done at bodiless level.
const EditorPlainClean = withoutHydration(Editable);

export { cxEditorPlain } from './tokens';
export {  EditorPlainClean };
