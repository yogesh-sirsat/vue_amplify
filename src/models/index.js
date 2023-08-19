// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Person, S3Object } = initSchema(schema);

export {
  Person,
  S3Object
};