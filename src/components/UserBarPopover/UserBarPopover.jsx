import css from "./UserBarPopover.module.css";
import svg from "../../img/icons/sprite.svg";
import { useModalContext } from "../../context/useModalContext";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";
import LogOutModal from "../LogOutModal/LogOutModal";
import { useTranslation } from "react-i18next";

function UserBarPopover() {
  const { openModal } = useModalContext();
  const { t } = useTranslation();
  // const [openModal, setOpenModal] = useState(null);

  // const handleOpenSettings = () => setOpenModal("settings");
  // const handleOpenSignOut = () => setOpenModal("signOut");
  // const handleCloseModal = () => setOpenModal(null);

  return (
    <div className={css.popover}>
      <ul className={css.wrapperItem}>
        <li>
          <button
            className={css.popoverItem}
            type="button"
            onClick={() => {
              openModal(<UserSettingsModal></UserSettingsModal>);
            }}
            // onClick={handleOpenSettings}
          >
            <svg className={css.icon}>
              <use href={`${svg}#icon-settings`}></use>
            </svg>
            {t("UserBarPopover.settings")}
          </button>
        </li>
        <li>
          <button
            className={css.popoverItem}
            type="button"
            onClick={() => {
              openModal(<LogOutModal></LogOutModal>);
            }}
            // onClick={handleOpenSignOut}
          >
            <svg className={css.icon}>
              <use href={`${svg}#icon-log-out`}></use>
            </svg>
            {t("UserBarPopover.logout")}
          </button>
        </li>
      </ul>
      {/* {openModal === 'settings' && <SettingsModal onClose={handleCloseModal} />}
      {openModal === 'signOut' && <SignOutModal onClose={handleCloseModal} />} */}
    </div>
  );
}

export default UserBarPopover;
