import React, { useEffect } from "react";
import { select, selectAll } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { transition } from 'd3-transition';

export function Axis({scale, orient, transform, ticks}) {
  function renderAxis() {
    let axis;

    if (orient === "bottom") {
      axis = axisBottom(scale);
    }
    if (orient === "left") {
      axis = axisLeft(scale).ticks(ticks);
    }
    select(".axis").call(axis);
  }

  function updateAxis() {
    const t = transition().duration(1000)

    if (orient === "left") {
      const axis = axisLeft(scale).ticks(ticks); 
      selectAll(`.${orient}`).transition(t).call(axis)
    }
  }

  useEffect(() => {
    renderAxis()
    updateAxis()
  })

  return (
    <g transform={transform} className={`${orient} axis`} />
  );
}
