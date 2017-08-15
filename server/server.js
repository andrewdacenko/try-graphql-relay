import express from 'express';
import './models';
import expressGraphQL from 'express-graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import schema from './schema/schema';
import { config } from 'dotenv';

config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

app.use(webpackMiddleware(webpack(webpackConfig)));

export default app;
