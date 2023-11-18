import { Axis } from './Axis';

export function XYAxis({ xScale, yScale, height }) {
 
  const xSettings = {
    scale: xScale,
    orient: 'bottom',
    transform: `translate(0, ${height - 35})`,
  };
  const ySettings = {
    scale: yScale,
    orient: 'left',
    transform: 'translate(0, 0)',
    ticks: 6,
  };
  return (
    <g className="axis-group">
      <Axis {...xSettings} />
      {/* <Axis {...ySettings} /> */}
    </g>
  );
}