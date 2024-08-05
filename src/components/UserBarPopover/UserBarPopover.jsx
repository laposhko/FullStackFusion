import css from './UserBarPopover.module.css';
import sprite from '../../img/sprite.svg';
// import svg from '../../img/icons/sprite.svg';

function UserBarPopover() {
  return (
    <div className={css.popover}>
      <ul className={css.wrapperItem}>
        <li>
          <button className={css.popoverItem} type="button">
            <svg className={css.icon}>
              <use xlinkHref={`${svg}#icon-settings`}></use>
            </svg>
            Settings
          </button>
        </li>
        <li>
          <button className={css.popoverItem} type="button">
            <svg className={css.icon}>
              <use xlinkHref={`${svg}#icon-log-out`}></use>
            </svg>
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default UserBarPopover;
