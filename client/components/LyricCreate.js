import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';

class LyricCreate extends Component {
  state = {
    content: ''
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.setState({
      content: ''
    });

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    });
  };

  onContentChange = (event) => {
    this.setState({
      content: event.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="add_lyric">Add Lyric</label>
        <input
          id="add_lyric"
          type="text"
          value={this.state.content}
          onChange={this.onContentChange}
        />
      </form>
    )
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        likes
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
