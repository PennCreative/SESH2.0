import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteSesh } from '../api/seshData';

export default function PostCard({ postObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const deleteThisSesh = () => {
    if (window.confirm(`Delete ${postObj.firebaseKey}?`)) {
      deleteSesh(postObj.firebaseKey).then(() => router.push('/sessions'));
    }
  };
  console.warn(postObj);
  return (
    <Card>
      <Card.Header>{postObj?.firebaseKey}</Card.Header>
      <Card.Body>
        <Card.Title>{user.handle}</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Link href={`/post/edit/${postObj?.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="link" onClick={deleteThisSesh}>Delete Sesh</Button>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    time: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

// PostCard.defaultProps = {
//   postObj: {
//     name: '',
//     image: '',
//     firebaseKey: '',
//     link: '',
//   },
// };
