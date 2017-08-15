import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} from 'graphql';

import { Lyric } from '../models';
import SongType from './song-type';

const LyricType = new GraphQLObjectType({
  name: 'LyricType',
  fields: () => ({
    id: {type: GraphQLID},
    likes: {type: GraphQLInt},
    content: {type: GraphQLString},
    song: {
      type: SongType,
      resolve(parentValue) {
        return Lyric.findById(parentValue).populate('song')
          .then(lyric => {
            console.log(lyric);
            return lyric.song
          });
      }
    }
  })
});

export default LyricType;
