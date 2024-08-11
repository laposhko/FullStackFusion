import { useSelector } from 'react-redux';
import css from './UserPanel.module.css';
import { selectAuthUser } from '../../redux/auth/selectors';

import UserBar from '../UserBar/UserBar.jsx';

function UserPanel() {
  const user = useSelector(selectAuthUser);
  return (
    <div className={css.userBarWrapper}>
      <h2 className={css.welcome}>
        Hello
        <span className={css.userName}>, {user.name}!</span>
      </h2>
      <UserBar />
    </div>
  );
}

export default UserPanel;
