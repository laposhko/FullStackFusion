import css from './CustomTooltip.module.css';

const customTooltip = ({ active, payload, coordinate }) => {
  if (active && payload) {
    return (
      <div
        className={css.wrapper}
        style={{
          left: `${coordinate.x}px`,
        }}
      >
        <p style={{ margin: 0, padding: 0 }}>{`${payload[0].value} ml`}</p>
        <div className={css.triangle}></div>
      </div>
    );
  }
  return null;
};
export default customTooltip;