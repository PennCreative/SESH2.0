import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function SeshCard({ obj }) {
  return (
    <>
      <Card className="seshcard">
        <Link href={`/session/${obj?.id}`} passHref>
          <Card.Img className="seshCardImg" variant="top" src={obj?.creator.profile_image_url} />
        </Link>
        <Card.Body>
          <Card.Title>{obj?.title}</Card.Title>
          <Card.Subtitle>{obj?.address}</Card.Subtitle>
          <Card.Text>
            {obj?.city}, {obj?.state}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
SeshCard.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    creator: PropTypes.shape({
      id: PropTypes.number,
      handle: PropTypes.string,
      profile_image_url: PropTypes.string,
    }),
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    time: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
