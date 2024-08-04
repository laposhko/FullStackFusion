import { useSelector } from 'react-redux';
import css from './UserPanel.modules.css';
import { selectAuthUser } from '../../redux/auth/selectors';

function UserPanel() {
  const user = useSelector(selectAuthUser);

  return (
    <div>
      <p>
        Hello
        <span className={css}>, {user.name}!</span>
      </p>
      <UserBar />
    </div>
  );
}

export default UserPanel;
