import { INestApplication } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { OpenApiNestFactory } from 'nest-openapi-tools';

export const generateClient = async (app: INestApplication) => {
  await OpenApiNestFactory.configure(
    app,
    new DocumentBuilder()
      .setTitle('Code Judge')
      .setDescription('An API to do awesome things')
      .addBearerAuth(),
    {
      webServerOptions: {
        enabled: true,
        path: 'api-docs',
      },
      fileGeneratorOptions: {
        enabled: true,
        outputFilePath: './openapi.json', // or ./openapi.json
      },
    },
    {
      operationIdFactory: (c: string, method: string) => method,
    }
  );
};
