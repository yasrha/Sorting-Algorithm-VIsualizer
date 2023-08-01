import React from "react";
import "../App.css";

/**
 * This component is a singular bar which we will use to visualize the sorting.
 *  It will take a height prop to adjust the height of the bar based on the value in the array.
 */
const Bar = ({ height, active }) => {
  const barStyle = {
    display: "inline-block", // Use inline-block to display bars horizontally
    height: `${height}px`, // Use the height prop to set the height of the bar
    width: "50px",
    backgroundColor: active ? "#068FFF" : "#404258", // Change the background color if active is true
    margin: "0 6px", // Spacing between bars
  };

  return <div style={barStyle}></div>;
};

export default Bar;
