import UserPanel from '../../components/UserPanel/UserPanel';
import DailyInfo from '../../components/DailyInfo/DailyInfo';
import css from './TrackerPage.module.css';

export default function TrackerPage() {
  return (
    <div>
      <h1>TrackerPage</h1>
      <UserPanel />
      <DailyInfo />
    </div>
  );
}
