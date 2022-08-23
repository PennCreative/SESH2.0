// import { useAuth } from '../utils/context/authContext';
import ProfileForm from '../components/forms/ProfileForm';

function Home() {
  // const { user } = useAuth();

  return (
    <div
      className="home"
    >
      <ProfileForm />
    </div>
  );
}

export default Home;
