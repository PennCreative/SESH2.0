// import { useAuth } from '../utils/context/authContext';
import ProfileForm from '../components/forms/ProfileForm';

function Home() {
  // const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
    >
      <ProfileForm />
    </div>
  );
}

export default Home;
