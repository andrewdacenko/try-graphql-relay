import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import SongType from './song-type';
import LyricType from './lyric-type';

import { Song, Lyric } from '../models';

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {title}) {
        return (new Song({title})).save()
      }
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: {type: new GraphQLNonNull(GraphQLString)},
        songId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parentValue, {content, songId}) {
        return Song.addLyric(songId, content);
      }
    },
    likeLyric: {
      type: LyricType,
      args: {id: {type: new GraphQLNonNull(GraphQLID)}},
      resolve(parentValue, {id}) {
        return Lyric.like(id);
      }
    },
    deleteSong: {
      type: SongType,
      args: {id: {type: new GraphQLNonNull(GraphQLID)}},
      resolve(parentValue, {id}) {
        return Song.remove({_id: id});
      }
    }
  }
});

export default mutationType;
