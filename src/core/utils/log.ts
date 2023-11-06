import { inspect } from 'util';

import log from 'loglevel';
import chalk from 'chalk';

if (process.env.NODE_ENV === 'development') {
  log.enableAll();
}

const dump = (obj: object) => inspect(obj, { colors: true, depth: null });

export { log, chalk, dump };
