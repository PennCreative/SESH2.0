import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
// import { useAuth } from '../utils/context/authContext';
import { deleteSesh } from '../api/seshData';

export default function SeshCard({ seshObj }) {
  const router = useRouter();
  const deleteThisSesh = () => {
    if (window.confirm(`Delete ${seshObj.firebaseKey}?`)) {
      deleteSesh(seshObj.firebaseKey).then(() => router.push('/sesh'));
    }
  };
  console.warn(seshObj);
  return (
    <Card>
      <Card.Header>{seshObj?.city}, {seshObj?.state}</Card.Header>
      <Card.Body>
        <Card.Title>{seshObj?.creator}</Card.Title>
        <Card.Text>
          {seshObj?.description}
        </Card.Text>
        <Link href={`/sesh/edit/${seshObj?.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="link" onClick={deleteThisSesh}>Delete Sesh</Button>
        <Button variant="link" onClick={deleteThisSesh}>Attend</Button>
      </Card.Body>
    </Card>
  );
}

SeshCard.propTypes = {
  seshObj: PropTypes.shape({
    title: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    creator: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    time: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
