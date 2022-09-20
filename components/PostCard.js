import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { deletePost } from '../api/postsData';

export default function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.firebaseKey}?`)) {
      deletePost(postObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card>
      <Link href={`/profile/${postObj?.creator}`} passHref>
        <Card.Title>{postObj?.creator}</Card.Title>
      </Link>
      <Card.Subtitle>{postObj?.time}</Card.Subtitle>
      <Card.Body>
        <Card.Title>{postObj?.post}</Card.Title>
        {postObj?.creator === user.handle
          ? (
            <>
              <Link href={`/post/edit/${postObj?.firebaseKey}`} passHref>
                <Button variant="info">EDIT</Button>
              </Link>
              <Button variant="link" onClick={deleteThisPost}>Delete Post</Button>
            </>
          )
          : ''}
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    name: PropTypes.string,
    creator: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    post: PropTypes.string,
    time: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
