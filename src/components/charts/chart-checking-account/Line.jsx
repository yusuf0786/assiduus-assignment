import React, { useEffect, useState } from 'react';
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

export function Line({xScale, yScale, data, lineGenerator}) {

  function updateChart() {
    const t = transition().duration(1000);

    const line = select('#line');
    const dot = selectAll('.circle');

    line.datum(data)
      .transition(t)
      .attr('d', lineGenerator);
  }

  useEffect(() => {

    select(".line-group")
      .append('path')
      .data(data)
      .attr('id', 'line')
      .attr('stroke', 'green')
      .attr('stroke-width', 3)
      .attr('fill', 'none')
      .attr('d', lineGenerator);

      updateChart()
  })

  return <g className="line-group"  />;
}
