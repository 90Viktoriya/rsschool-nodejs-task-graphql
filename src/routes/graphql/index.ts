import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { GraphQLContext } from './types/context.js';
import { createLoaders } from './loader/loader.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const errors = validate(schema, parse(query), [ depthLimit(5) ]);
      if (errors.length > 0) return { errors };
      const context: GraphQLContext = {
        dataLoader: createLoaders(prisma),
        prisma,
      };
      return await graphql({
        schema,
        source: query,
        contextValue: context,
        variableValues: variables,
      });
    },
  });
};

export default plugin;
