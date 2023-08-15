import { DefaultContentNode } from '@bodiless/data';

/**
 * LanguageContentNode class allows to handle content nodes for current language.
 *
 * @category Language Node API
 */
class LanguageContentNode<D extends object> extends DefaultContentNode<D> {
  // @ts-ignore has no initializer and is not definitely assigned in the constructor
  private langcode: string;

  static create(node: DefaultContentNode<object>, langcode: string) {
    const pathWithLangCode = [
      node.path[0],
      langcode,
      ...node.path.slice(1, -1),
    ];
    const sectionNode = new LanguageContentNode(
      node.getActions(),
      node.getGetters(),
      pathWithLangCode,
    );
    sectionNode.setLanguage(langcode);
    return sectionNode;
  }

  setLanguage(langcode: string) {
    this.langcode = langcode;
  }
}

export { LanguageContentNode };
