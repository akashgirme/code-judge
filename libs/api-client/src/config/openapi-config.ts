import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: '../../../../openapi.json',
  apiFile: './emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: '../api/api-query.ts',
  exportName: 'apiQuery',
  hooks: true,
};

export default config;
