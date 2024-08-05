import { useSelector } from 'react-redux';
import css from './UserPanel.module.css';
import { selectAuthUser } from '../../redux/auth/selectors';
import UserBar from '../UserBar/UserBar';

function UserPanel() {
  const user = useSelector(selectAuthUser);

  return (
    <div className={css.userBarWrapper}>
      <p className={css.welcome}>
        Hello
        {/* <span className={css}>, {user.name}!</span> */}
        <span className={css.userName}>, User!</span>
      </p>
      <UserBar />
    </div>
  );
}

export default UserPanel;
