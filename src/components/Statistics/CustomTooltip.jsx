import css from './CustomTooltip.module.css';

const customTooltip = ({ active, payload, coordinate }) => {
  if (active && payload && payload.length) {

    // const data = payload[0]?.payload; 

    return (
      <div
        className={css.wrapper}
        style={{
          left: `${coordinate.x}px`,
        }}
      >
        <p style={{ margin: 0, padding: 0 }}>{`${payload[0].value ?? 0} ml`}</p>
        <div className={css.triangle}></div>
      </div>
    );
  }
  return null;
};
export default customTooltip;