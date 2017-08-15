import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import SongType from './song-type';
import LyricType from './lyric-type';

import { Song, Lyric } from '../models';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return Song.find({});
      }
    },
    song: {
      type: SongType,
      args: {id: {type: new GraphQLNonNull(GraphQLID)}},
      resolve(parentValue, {id}) {
        return Song.findById(id);
      }
    },
    lyric: {
      type: LyricType,
      args: {id: {type: new GraphQLNonNull(GraphQLID)}},
      resolve(parentValue, {id}) {
        return Lyric.findById(id);
      }
    }
  })
});

export default queryType;
