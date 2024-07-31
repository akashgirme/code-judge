import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://localhost:3000/api-docs-json',
  apiFile: './emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: '../lib/api/api-client.ts',
  exportName: 'apiClient',
  hooks: true,
};

export default config;
