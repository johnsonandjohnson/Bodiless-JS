export const createLogger = (log = true) => (message: string) => {
  // eslint-disable-next-line no-console
  if (log) console.log(message);
};

type IncludeSetting = RegExp | boolean;

export type PluginOptions = {
  enabled?: boolean,
  logging?: boolean,
  include?: IncludeSetting,
};
