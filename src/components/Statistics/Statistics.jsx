import { useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import CustomTooltip from './CustomTooltip';

import css from './Statistics.module.css';

const Statistics = ({ data }) => {
  const renderCustomDot = ({ cx, cy, index }) => {
    if (index === 0 || index === data.length - 1) return null;
    return (
      <g key={`custom-dot-${index}`}>
        <circle
          cx={cx}
          cy={cy}
          r={3}
          fill="white"
          stroke="#82ca9d"
          strokeWidth={2}
        />
        <circle cx={cx} cy={cy} r={2} fill="white" />
      </g>
    );
  };
  const formatYAxis = (value) => {
    return value === 0
      ? `${value}%`
      : value % 1 === 0
        ? `${value / 1000} L`
        : `${(value / 1000).toFixed(1)} L`;
  };
  const yAxisStyle = {
    color: 'rgb(50, 63, 71)',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '18px',
    textWrap: 'nowrap',
    textAnchor: 'start',
    dx: -30,
  };
  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args) => {
      if (typeof args[0] === 'string' && /defaultProps/.test(args[0])) {
        return;
      }

      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return (
    <div className={css.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 23,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9BE1A0" stopOpacity={1} />
              <stop offset="80%" stopColor="#9BE1A0" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#9BE1A0" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            padding={{ left: 10 }}
            tickCount={11}
            interval={3}
          />
          <YAxis
            domain={[0, 2500]}
            axisLine={false}
            tickLine={false}
            width={40}
            padding={{ bottom: 5 }}
            tick={yAxisStyle}
            tickFormatter={formatYAxis}
            tickCount={6}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={true}
            isAnimationActive={true}
          />
          <Area
            type="linear"
            dataKey="value"
            stroke="#82ca9d"
            fill="url(#colorUv)"
            dot={renderCustomDot}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;