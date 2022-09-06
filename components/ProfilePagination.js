import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import PostForm from './forms/PostForm';

export default function ProfilePagination() {
  return (
    <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Posts">
        <PostForm />
      </Tab>
      <Tab eventKey="profile" title="Sessions">
        <Button variant="primary" type="submit">Create Session</Button>
      </Tab>
      {/* <Tab eventKey="contact" title="Contact">
                <h1>Conact</h1>
              </Tab> */}
    </Tabs>
  );
}
