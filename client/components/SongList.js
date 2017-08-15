import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import './SongList.css';

import fetchSongs from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete = (id) => {
    this.props.mutate({
      variables: {id}
    }).then(() => {
      this.props.data.refetch();
    })
  };

  renderSongs(songs) {
    return (
      <ul className="collection">
        {songs.map(({id, title}) => {
          return (
            <li key={id} className="collection-item">
              <Link to={`/songs/${id}`}>{title}</Link>
              <i
                className="material-icons"
                onClick={() => this.onSongDelete(id)}
              >
                delete
              </i>
            </li>
          );
        })}
      </ul>
    )
  }

  render() {
    const {loading, songs} = this.props.data;

    return loading ? null : (
      <div>
        {this.renderSongs(songs)}
        <Link
          className="btn-floating btn-large red right"
          to="/songs/new"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(fetchSongs)(SongList)
);
