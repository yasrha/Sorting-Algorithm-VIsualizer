import React from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

import "../App.css";

/** This component will contain the buttons to work the sorter */
export default function Toolbar({ randomizeArray, sortArray }) {
  const [algorithm, setAlgorithm] = React.useState("");

  const handleAlgorithmChange = (event) => {
    const selectedAlgorithm = event.target.value;
    setAlgorithm(selectedAlgorithm);
  };

  const handleSortClicked = () => {
    sortArray(algorithm); // Pass the algorithm to the callback function
  };

  const sortingOptions = (
    <div className="sortingOptions">
      <FormControl sx={{ m: 1, width: 150, mt: 1 }}>
        <InputLabel id="demo-controlled-open-select-label">
          Algorithm
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={algorithm}
          label="Algorithm"
          onChange={handleAlgorithmChange}
        >
          <MenuItem disabled value="">
            <em>Algorithm</em>
          </MenuItem>
          <MenuItem value={"selection"}>Selection sort</MenuItem>
          <MenuItem value={"bubble"}>Bubble sort</MenuItem>
          <MenuItem value={"insertion"}>Insertion sort</MenuItem>
          <MenuItem value={"heap"}>Heap sort</MenuItem>
          <MenuItem value={"merge"}>Merge sort</MenuItem>
          <MenuItem value={"quick"}>Quick sort</MenuItem>
        </Select>
      </FormControl>
    </div>
  );

  return (
    <div className="toolbar">
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Button variant="contained" onClick={randomizeArray}>
          Randomize
        </Button>
        <Button
          variant="contained"
          onClick={handleSortClicked}
          disabled={!algorithm}
        >
          Sort
        </Button>
        <div className="options">{sortingOptions}</div>
      </Grid>
    </div>
  );
}
