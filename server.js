import express from 'express';
import expressGraphQL from 'express-graphql';
import { Schema } from './data/schema';

const app = express();
const port = process.env.PORT || 4000;

app.use('/graphql', expressGraphQL({
  schema: Schema,
  graphiql: true
}));

app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});
