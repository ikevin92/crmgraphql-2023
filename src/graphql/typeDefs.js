import { mergeTypeDefs } from '@graphql-tools/merge';
import { types } from './typeDefs/types.js';
import { inputs } from './typeDefs/inputs.js';
import { queries } from './typeDefs/queries.js';
import { mutations } from './typeDefs/mutations.js';

const typeDefs = mergeTypeDefs([types, inputs, queries, mutations]);

export { typeDefs };
