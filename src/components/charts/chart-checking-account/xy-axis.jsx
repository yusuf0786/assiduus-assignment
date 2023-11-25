import { Axis } from './Axis';

export function XYAxis({ xScale, yScale, height, width }) {
 
  const xSettings = {
    scale: xScale,
    orient: 'bottom',
    transform: `translate(0, ${height - 35})`,
    width: width,
  };
  const ySettings = {
    scale: yScale,
    orient: 'left',
    transform: 'translate(0, 0)',
    ticks: 6,
  };
  return (
    <g className="axis-group" width={width}>
      <Axis {...xSettings} />
      {/* <Axis {...ySettings} /> */}
    </g>
  );
}