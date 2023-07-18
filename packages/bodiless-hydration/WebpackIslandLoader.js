const fs = require('fs');
const { resolve } = require('path');
const parser = require('@babel/parser');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const AutoDiscoverIslands = require('./AutoDiscoverIslands');

module.exports = (source) => {
  if (
    source.search('withIslandsHydrator') === -1
    || source.search('var IslandsHydrator') > -1
    || source.search('export { default as withIslandsHydrator }') > -1
  ) return source;

  const ast = parser.parse(source, {
    sourceType: 'module',
    plugins: ['jsx']
  });

  let foundWithIslandsHydrator = false;
  let foundIslandsFile = false;

  const islandsFilePath = resolve('.next/cache/islands.js');
  foundIslandsFile = false;

  if (fs.existsSync(islandsFilePath)) {
    foundIslandsFile = true;
  } else {
    AutoDiscoverIslands('.next/cache');
  }

  traverse(ast, {
    ImportDeclaration(path) {
      if (path.node.source.value === '@bodiless/hydration' && path.node.specifiers) {
        path.node.specifiers.forEach(specifier => {
          if (specifier.imported && specifier.imported.name === 'withIslandsHydrator') {
            foundWithIslandsHydrator = true;
          }
        });
      }
    },
  });

  const unusedIdentifier = new Set();
  if (foundWithIslandsHydrator && foundIslandsFile) {
    traverse(ast, {
      CallExpression(path) {
        // Look for usage of asFluidToken.
        if (path.node.callee.name === 'asFluidToken') {
          // Traverse inside asFluidToken.
          traverse(path.node, {
            ObjectExpression(path) {
              // Traverse inside any object provided as argument to asFluidToken.
              traverse(path.node, {
                ObjectProperty(path) {
                  if (path.node.key.name !== 'Island' && path.node.key.name !== '_') {
                    // Store the removed Identifier before actually remove it.
                    traverse(path.node, {
                      Identifier(path) {
                        if (
                          path.key !== 'key'
                          && path.key !== 'property'
                          && !unusedIdentifier.has(path.node.name)) {
                          unusedIdentifier.add(path.node.name);
                        }
                      },
                    }, path.scope);
                    path.remove();
                  }
                },
              }, path.scope);
            },
          }, path.scope);
        }
      }
    });

    // Remove from unusedIdentifier any one still used.
    traverse(ast, {
      Identifier(path) {
        if (path.parent.type !== 'ImportSpecifier' && unusedIdentifier.has(path.node.name)) {
          unusedIdentifier.delete(path.node.name);
        }
      },
    });

    // Remove Unused imports.
    traverse(ast, {
      ImportDeclaration(path) {
        // eslint-disable-next-line no-param-reassign
        path.node.specifiers = path.node.specifiers.filter(specifier => {
          if (specifier.imported && unusedIdentifier.has(specifier.imported.name)) {
            return false;
          }
          return true;
        });

        // If all specifiers are removed, remove the import declaration itself.
        if (path.node.specifiers.length === 0) {
          path.remove();
        }
      },
      // Add Islands as argument to withIslandsHydrator.
      CallExpression(path) {
        if (path.node.callee.name === 'withIslandsHydrator') {
          // eslint-disable-next-line no-param-reassign
          path.node.arguments = [t.identifier('Islands')];
        }
      },
    });

    // Add Islands import.
    const importIslands = t.importDeclaration(
      [t.importDefaultSpecifier(t.identifier('Islands'))],
      t.stringLiteral(islandsFilePath)
    );

    ast.program.body.unshift(importIslands);
  }

  traverse(ast, {
    ObjectProperty(path) {
      if (path.node.key.name === 'Island') {
        // eslint-disable-next-line no-param-reassign
        path.node.key.name = 'Core';
      }
    },
  });

  const { code } = generate(ast);
  console.log('[Island Loader] withIslandsHydrator discovered, the token has been altered.');

  return code;
};
