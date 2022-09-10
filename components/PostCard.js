import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { deletePost } from '../api/postsData';

export default function PostCard({ postObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.firebaseKey}?`)) {
      deletePost(postObj.firebaseKey).then(() => router.push('/'));
    }
  };
  return (
    <Card>
      <Card.Header>{user.handle}</Card.Header>
      <Card.Body>
        <Card.Title>{postObj?.firebaseKey}</Card.Title>
        <Card.Text>
          {postObj?.post}
        </Card.Text>
        <Link href={`/post/edit/${postObj?.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="link" onClick={deleteThisPost}>Delete Post</Button>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    post: PropTypes.string,
    time: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
