import { gql } from 'react-apollo';

export default gql`
  query SongQuery($id:ID!) {
    song(id: $id) {
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