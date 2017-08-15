import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  renderNoSongFound() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Song Not Found</h3>
      </div>
    );
  }

  render() {
    const {loading, song} = this.props.data;

    if (loading) {
      return null;
    }

    return song ? (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics}/>
        <LyricCreate songId={song.id}/>
      </div>
    ) : this.renderNoSongFound();
  }
}

export default graphql(fetchSong, {
  options({match}) {
    return {
      variables: {
        id: match.params.id
      }
    }
  }
})(SongDetail);
