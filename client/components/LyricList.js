import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import './LyricList.css';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: {id},
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          likes: likes + 1,
          __typename: 'LyricType'
        }
      }
    });
  }

  renderLyrics() {
    const {lyrics} = this.props;

    return lyrics.map(({id, likes, content}) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i
              className="material-icons"
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    )
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
