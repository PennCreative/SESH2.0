import Button from 'react-bootstrap/Button';

export default function TypeCard() {
  <div className="card cardForm text-center text-dark bg-light mb-3">
    <div className="card-header">
      Select Account Type
    </div>
    <div className="card-body">
      <Button variant="outline-info" className="btn">Person</Button>
      <Button variant="outline-info" className="btn">Shop</Button>
      <Button variant="outline-info" className="btn">Park</Button>
    </div>
    <div className="card-footer text-muted">
      Sesh &#8482;
    </div>
  </div>;
}
