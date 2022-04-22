import { KnapsackRendererBase, log } from '@knapsack/app';
import { KnapsackRendererWebpackBase } from '@knapsack/renderer-webpack-base';
import {
  KnapsackConfig,
  KnapsackRenderParams,
  KnapsackTemplateRenderer as Renderer,
  KnapsackTemplateRendererBase,
  Patterns,
} from '@knapsack/app/types';
import { KnapsackReactRenderer as Base } from '@knapsack/renderer-react';
import {
  isObjectProp,
  KsJsImport,
  KsTemplateSpec as KsTemplateSpecBase,
  ObjectProp,
} from '@knapsack/types';
import { findUpPkgJson } from '@knapsack/file-utils';
import { isObject } from '@knapsack/utils';
import { getDemoAppUsage, getUsage } from './utils';
import { KnapsackBodilessSpec } from './types';

const { pkg } = findUpPkgJson(__dirname);

const ourImports: KsJsImport[] = [
  {
    type: 'extra',
    importInfo: {
      path: '@canvasx/elements',
      name: 'as',
      type: 'named',
    },
  },
  {
    type: 'extra',
    importInfo: {
      path: '@bodiless/core',
      name: 'withDefaultContent',
      type: 'named',
    },
  },
  ...['addProps', 'withDesign', 'asToken'].map((name) => ({
    type: 'extra' as const,
    importInfo: {
      path: '@bodiless/fclasses',
      name,
      type: 'named' as const,
    },
  })),
];

/** @see {KsTemplateSpec['meta']} */
type KsTemplateSpecMeta = {
  tokensExportName: string;
  componentExportName: string;
};

type KsTemplateSpec = KsTemplateSpecBase<KsTemplateSpecMeta>;

function isKsTemplateSpecMeta(meta: unknown): meta is KsTemplateSpecMeta {
  return isObject(meta) && meta.tokensExportName && meta.componentExportName;
}

export class KnapsackBodilessRenderer extends Base implements Renderer {
  title: string;

  constructor({
    webpackConfig,
    demoWrapperPath,
    altRendererId,
  }: {
    webpackConfig?: ConstructorParameters<
      typeof KnapsackRendererWebpackBase
    >[0]['webpackConfig'];
    demoWrapperPath?: string;
    altRendererId?: {
      id: string;
      title: string;
    };
  } = {}) {
    super({
      id: altRendererId?.id || 'bodiless',
      webpackConfig,
      demoWrapperPath,
    });
    this.title = altRendererId?.title || 'Bodiless';
    this.language = 'jsx';
  }

  getJsImports(): ReturnType<Base['getJsImports']> {
    const imports = super.getJsImports();
    imports.push(...ourImports);
    return imports;
  }

  getTemplateName(opt: { patternId: string; templateId: string }): string {
    const hasSingleTemplate =
      this.getMyTemplates().allTemplates.filter(
        (t) => t.patternId === opt.patternId,
      ).length === 1;
    return this.changeCase(
      hasSingleTemplate ? opt.patternId : `${opt.patternId}-${opt.templateId}`,
    );
  }

  getSpec({
    patternId,
    templateId,
  }: {
    patternId: string;
    templateId: string;
  }): KsTemplateSpec & Required<Pick<KsTemplateSpec, 'meta'>> {
    const pattern = this.patterns.getPattern(patternId);
    if (!pattern) {
      throw new Error(`Pattern ${patternId} not found`);
    }
    const template = pattern.templates?.find((t) => t.id === templateId);
    if (!template) {
      throw new Error(`Pattern ${patternId}, Template ${templateId} not found`);
    }
    if (!template.spec) {
      throw new Error(
        `Pattern ${patternId}, Template ${templateId} has no spec`,
      );
    }
    const { meta } = template.spec;
    if (!isKsTemplateSpecMeta(meta)) {
      throw new Error(
        `Pattern ${patternId}, Template ${templateId} has no spec.meta`,
      );
    }
    return {
      ...template.spec,
      meta,
    };
  }

  async getUsageAndImports({
    pattern,
    template,
    demo,
    isForCodeBlock,
    patternManifest,
  }: Parameters<Base['getUsageAndImports']>[0] & {
    isForCodeBlock: boolean;
  }): ReturnType<Base['getUsageAndImports']> {
    if (Base.isTemplateDemo(demo)) {
      const imp = this.getJsImport({
        patternId: pattern.id,
        templateId: template.id,
        demoId: demo.id,
      });
      if (!imp) {
        throw new Error(
          `No import found for ${pattern.id} ${template.id} ${demo.id}`,
        );
      }
      return {
        usage: '',
        imports: [imp],
      };
    }
    const imp = this.getJsImport({
      patternId: pattern.id,
      templateId: template.id,
    });
    if (!imp) {
      throw new Error(`No import found for ${pattern.id} ${template.id}`);
    }

    const { tokensExportName } = this.getSpec({
      patternId: pattern.id,
      templateId: template.id,
    }).meta;
    const { props, slots = {}, extras = {} } = demo.data;

    const imports: KsJsImport[] = [imp];

    const slotUsages = await Promise.all(
      Object.entries(slots).map(async ([slotName, slotItems]) => {
        const usages = await Promise.all(
          slotItems.map(async (slotItem) => {
            if (KnapsackRendererBase.isSlottedText(slotItem)) {
              throw new Error(`Unsupported slotted text item: ${slotItem}`);
            }
            const slotPattern = this.patterns.getPattern(slotItem.patternId);

            const slotTemplate = slotPattern.templates.find(
              (t) => t.id === slotItem.templateId,
            );

            const { usage, imports: slotImports } =
              await this.getUsageAndImports({
                pattern: slotPattern,
                template: slotTemplate,
                demo: slotTemplate?.demosById[slotItem.demoId],
                patternManifest,
                isForCodeBlock,
              });
            imports.push(...slotImports);
            return usage;
          }),
        );
        return {
          slotName,
          usages,
        };
      }),
    );

    type WithDesign = Parameters<typeof getUsage>[0]['withDesign'];

    const withDesign: WithDesign = slotUsages.reduce(
      (cur, { slotName, usages }) => {
        if (usages.length > 1) {
          throw new Error(
            `This renderer does not support multiple items in a single slot; it can only have one item in a slot.`,
          );
        }
        const [value] = usages;
        if (!value) return cur;
        cur[slotName] = {
          type: 'raw',
          value,
        };
        return cur;
      },
      {} as WithDesign,
    );

    const { usage, refs } = await getUsage({
      bodilessTokens: Object.entries(props)
        .flatMap(([name, value]) => {
          if (isObject(value)) {
            // in `inferSpec` we will make an object of boolean for pure-presentational purposes, so let's flatten them here.
            return Object.entries(value);
          }
          return [[name, value]];
        })
        .flatMap(([name, value]) => {
          if (!value) return [];
          return [
            {
              type: 'var',
              name: isForCodeBlock
                ? `${tokensExportName}.${name}`
                : `${template.alias}.tokens.${name}`,
            },
          ];
        }),
      withDefaultContent: extras,
      withDesign,
    });

    return {
      imports,
      usage,
    };
  }

  async render(opt: Parameters<Base['render']>[0]): ReturnType<Base['render']> {
    const { patternManifest, pattern, template, demo } = opt;
    const { componentExportName: componentExportName2 } = this.getSpec({
      patternId: pattern.id,
      templateId: template.id,
    }).meta;

    const createDemoCode = async ({
      isForCodeBlock,
    }: {
      isForCodeBlock: boolean;
    }): Promise<{ code: string; imports: KsJsImport[] }> => {
      const { usage, imports } = await this.getUsageAndImports({
        ...opt,
        isForCodeBlock,
      });
      const templateName = Base.isTemplateDemo(opt.demo)
        ? this.getJsImport({
            patternId: pattern.id,
            templateId: template.id,
            demoId: demo.id,
          }).importInfo.name
        : this.getTemplateName({
            patternId: pattern.id,
            templateId: template.id,
          });
      const prep = Base.isTemplateDemo(opt.demo)
        ? usage
        : `const ${templateName} = ${usage}(${
            isForCodeBlock
              ? `${componentExportName2}`
              : `${template.alias}.component`
          })`;

      let importsForCodeBlock = '';
      if (isForCodeBlock) {
        importsForCodeBlock = this.createJsImportCodeBlock({
          imports: imports.flatMap((imp): KsJsImport[] => {
            if (imp.type !== 'pattern-template') return [imp];
            const id = `${imp.patternId}-${imp.templateId}`;
            const { componentExportName, tokensExportName } = this.getSpec({
              patternId: imp.patternId,
              templateId: imp.templateId,
            }).meta;

            const tokenImport: KsJsImport = {
              ...imp,
              importInfo: {
                ...imp.importInfo,
                name: tokensExportName,
              },
            };
            const componentImport: KsJsImport = {
              ...imp,
              importInfo: {
                ...imp.importInfo,
                name: componentExportName,
              },
            };
            if (`${pattern.id}-${template.id}` === id) {
              return [componentImport, tokenImport];
            }
            return [tokenImport];
          }),
        }).code;
      }
      const code = await getDemoAppUsage({
        children: `<${templateName} />`,
        prep,
        imports: importsForCodeBlock,
      });
      return { code, imports };
    };

    const [{ code: demoApp, imports }, { code: demoAppUsage }] =
      await Promise.all([
        createDemoCode({
          isForCodeBlock: false,
        }),
        createDemoCode({
          isForCodeBlock: true,
        }),
      ]);
    return this.prepClientRenderResults({
      demoApp,
      usage: demoAppUsage,
      imports,
    });
  }

  inferSpec: Base['inferSpec'] = async ({
    patternId,
    template,
    templatePath,
  }): ReturnType<Base['inferSpec']> => {
    try {
      const x = await this.importJsModule({
        path: templatePath,
      });
      const bodilessSpec = x[template.alias] as KnapsackBodilessSpec;
      if (!bodilessSpec) {
        throw new Error(
          `No named export "${template.alias}" found after importing from "${templatePath}"`,
        );
      }
      const { tokens, slots, componentExportName, tokensExportName } =
        bodilessSpec;
      const props: KsTemplateSpec['props'] = Object.entries(tokens).reduce(
        (cur, [tokenName, token]) => {
          const group = token.Meta?.categories?.Group?.[0];
          if (!group) {
            cur.properties[tokenName] = {
              type: 'boolean',
              description: '',
            };
          } else {
            let groupObject = cur.properties[group];
            if (!isObject(groupObject) || !isObjectProp(groupObject)) {
              groupObject = {
                type: 'object',
                properties: {},
              };
            }
            groupObject.properties[tokenName] = {
              type: 'boolean',
            };
            cur.properties[group] = groupObject;
          }
          return cur;
        },
        {
          type: 'object',
          required: [],
          properties: {},
        } as KsTemplateSpec['props'],
      );

      const slotsSpec: KsTemplateSpec['slots'] = Object.entries(
        slots || {},
      ).reduce((cur, [slotName, { title, description, allowedPatternIds }]) => {
        cur[slotName] = {
          title,
          description,
          disallowText: true,
          allowedPatternIds,
        };
        return cur;
      }, {} as KsTemplateSpec['slots']);
      return {
        props,
        isInferred: true,
        slots: slotsSpec,
        extraDocs: [
          {
            id: 'bodiless-tokens',
            title: 'Bodiless Tokens',
            tableRows: Object.entries(bodilessSpec.tokens).map(
              ([name, token]) => ({
                name,
                // Field is parsed as Markdown, so we want those tick marks in
                description: `\`${JSON.stringify(token)} \``,
              }),
            ),
          },
        ],
        meta: {
          componentExportName,
          tokensExportName,
        },
      };
    } catch (e) {
      log.warn(`Failed to infer spec for "${templatePath}": ${e.message}`, e);
      return false;
    }
  };

  getMeta: Base['getMeta'] = () => ({
    id: this.id,
    title: this.title,
    aliasUse: 'optional',
    aliasTitle: 'Named Export',
    aliasIsJsNamedExport: true,
    aliasDescription:
      'If `export X` was used instead of `export default`, then provide X.',
    enableDataDemos: true,
    enableTemplateDemos: true,
    hasSlotsSupport: true,
    version: pkg.version,
    hasInferSpecSupport: true,
  });
}
