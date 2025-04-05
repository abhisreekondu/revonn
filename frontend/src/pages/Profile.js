import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();  
  return (
    <div>
      <p>Profile Page for {username}</p>
    </div>
  );
};

export default Profile;
