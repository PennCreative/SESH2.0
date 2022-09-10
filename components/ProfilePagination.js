import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import PostForm from './forms/PostForm';

export default function ProfilePagination() {
  const router = useRouter();
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
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            router.push('/sesh/new');
          }}
        >Create Session
        </Button>
      </Tab>
    </Tabs>
  );
}
