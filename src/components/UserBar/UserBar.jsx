import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { HiChevronDown } from 'react-icons/hi';
import { selectAuthUser } from '../../redux/auth/selectors';
import css from './UserBar.module.css';
import UserBarPopover from '../UserBarPopover/UserBarPopover';

function UserBar() {
  const user = useSelector(selectAuthUser);
  const [isOpen, setIsOpen] = useState(false);
  const userBarRef = useRef(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeOnClickOutside = (e) => {
    if (userBarRef.current && !userBarRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeOnClickOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnClickOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <div ref={userBarRef} className={css.userBarWrapper}>
      <button type="button" className={css.userBar} onClick={toggleOpen}>
        <span>{user.name}</span>

        <img src={user.avatar} alt="User avatar" className={css.avatar} />
        <HiChevronDown
          className={`${css.arrowDown} ${isOpen ? css.arrowDownOpen : ''}`}
        />
      </button>
      {isOpen && <UserBarPopover />}
    </div>
  );
}

export default UserBar;
