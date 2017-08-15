import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql';

import { Song } from '../models';
import LyricType from './lyric-type';

const SongType = new GraphQLObjectType({
  name: 'SongType',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve(parentValue) {
        return Song.findLyrics(parentValue.id);
      }
    }
  })
});

export default SongType;
