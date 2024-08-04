import { useSelector } from 'react-redux';
import { HiChevronDown } from 'react-icons/hi';
import { selectAuthUser } from '../../redux/auth/selectors';
import css from './UserBar.module.css';

function UserBar() {
  const user = useSelector(selectAuthUser);

  return (
    <button type="button" className={css.userBar}>
      <span>{user.name}!</span>
      <img src={user.avatar} alt="User avatar" className={css.avatar} />
      <HiChevronDown className={css.arrowDown} />
    </button>
  );
}

export default UserBar;
