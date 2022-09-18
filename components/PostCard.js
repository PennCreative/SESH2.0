import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { deletePost } from '../api/postsData';

export default function PostCard({ postObj, onUpdate }) {
  // const router = useRouter();
  const { user } = useAuth();
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.firebaseKey}?`)) {
      deletePost(postObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card>
      <Card.Header>{postObj?.creator}</Card.Header>
      <Card.Body>
        <Card.Title>{postObj?.post}</Card.Title>
        {/* <Card.Text>
          {postObj?.post}
        </Card.Text> */}
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
    time: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
