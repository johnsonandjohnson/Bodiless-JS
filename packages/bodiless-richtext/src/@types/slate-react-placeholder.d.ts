declare module 'slate-react-placeholder' {
  export default function PlaceholderPlugin(SlateReactPlaceholderOption): Plugin;

  export interface SlateReactPlaceholderOption {
    placeholder: string;
    when: string;
    style: object;
  }
}
