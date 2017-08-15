import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import fetchSongs from '../queries/fetchSongs';

class SongCreate extends Component {
  state = {
    title: ''
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.mutate({
      variables: {
        title: this.state.title
      },
      refetchQueries: [{
        query: fetchSongs
      }]
    }).then(() => {
      this.props.history.push('/');
    }).catch(() => {

    });
  };

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="song_title">Song Title:</label>
          <input
            id="song_title"
            type="text"
            value={this.state.value}
            onChange={e => this.setState({title: e.target.value})}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
