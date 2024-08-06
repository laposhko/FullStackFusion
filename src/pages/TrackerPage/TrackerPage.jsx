import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import css from './TrackerPage.module.css'


export default function TrackerPage() {
  return (
    <div className={css.pageContainer}>
      <WaterMainInfo/>
    </div>
  );
}
