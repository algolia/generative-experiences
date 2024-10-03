import { algoliasearch } from 'algoliasearch';

import type { CommerceClientOptions, _createClientBase } from './client-base';

export function createClient(options: CommerceClientOptions) {
  return _createClientBase(options, algoliasearch);
}
