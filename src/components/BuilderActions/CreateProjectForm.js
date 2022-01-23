import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";

export default function CreateProjectForm(setData) {
  const [checkProjectField, setCheckProjectField] = useState(false);
  const [checkRoomField, setCheckRoomField] = useState(false);
  const [checkLoftField, setCheckLoftField] = useState("false");
  const [checkLoftTiltBothField, setCheckLoftTiltBothField] = useState("");

  const handleChangeProject = (event) => {
    if (event.target.value !== "") {
      setCheckProjectField(true);
    } else {
      setCheckProjectField(false);
      setCheckRoomField(false);
    }
  };

  const handleChangeRoom = (event) => {
    if (event.target.value !== "") {
      setCheckRoomField(true);
    } else {
      setCheckRoomField(false);
    }
  };

  const handleChangeLoft = (event) => {
    if (event.target.value === "true") {
      setCheckLoftField("true");
      setCheckLoftTiltBothField("leftToRight");
    } else {
      setCheckLoftField("false");
      setCheckLoftTiltBothField("");
    }
  };

  const handleChangeLoftTiltBoth = (event) => {
    if (event.target.value === "both") {
      setCheckLoftTiltBothField(event.target.value);
    } else if (event.target.value === "leftToRight") {
      setCheckLoftTiltBothField(event.target.value);
    } else if (event.target.value === "rightToLeft") {
      setCheckLoftTiltBothField(event.target.value);
    }
  };

  const handleFormSubmit = () => {};

  return (
    <React.Fragment>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginTop: 2, marginBottom: 2, marginLeft: 3 }}
      >
        We just need a couple of details ...
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Grid item>
            <TextField
              required
              id="projectName"
              name="projectName"
              label="Project name"
              fullWidth
              variant="standard"
              onChange={handleChangeProject}
            />
          </Grid>
          {checkProjectField === true ? (
            <Grid item>
              <TextField
                required
                id="roomName"
                name="roomName"
                label="Room name"
                fullWidth
                variant="standard"
                onChange={handleChangeRoom}
              />
            </Grid>
          ) : (
            ""
          )}
          {checkRoomField === true ? (
            <Grid item>
              <TextField
                required
                id="wallName"
                name="wallName"
                label="Direction (Wall name)"
                fullWidth
                variant="standard"
              />
              <TextField
                required
                id="wallWidth"
                name="wallWidth"
                label="Width (10.5m)"
                fullWidth
                variant="standard"
                type="number"
              />

              <Grid item>
                <TextField
                  required
                  id="wallHeight"
                  name="wallHeight"
                  label="Height (2.55m)"
                  fullWidth
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <p>Unit of measure: </p>
                </Grid>
                <Grid item>
                  <RadioGroup
                    aria-label="unitOfMeasure"
                    defaultValue="m"
                    sx={{ paddingTop: 1 }}
                    name="rbg-unitOfMeasure"
                  >
                    <FormControlLabel
                      value="m"
                      control={<Radio />}
                      label="meters"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={6}>
                  <p>Is there an attic ceiling: </p>
                </Grid>
                <Grid item>
                  <RadioGroup
                    aria-label="loft"
                    defaultValue="false"
                    sx={{ paddingTop: 1 }}
                    name="rbgLoft"
                    onChange={handleChangeLoft}
                  >
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="false"
                    />
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="true"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
          {checkLoftField === "true" ? (
            <Grid container>
              <Grid item xs={6}>
                <p>From which directions does ceiling tilt: </p>
              </Grid>
              <Grid item>
                <RadioGroup
                  aria-label="loft"
                  defaultValue="leftToRight"
                  sx={{ paddingTop: 1 }}
                  name="rbgLoft"
                  onChange={handleChangeLoftTiltBoth}
                >
                  <FormControlLabel
                    value="leftToRight"
                    control={<Radio />}
                    label="Left to Right"
                  />
                  <FormControlLabel
                    value="rightToLeft"
                    control={<Radio />}
                    label="Right to Left"
                  />
                  <FormControlLabel
                    value="both"
                    control={<Radio />}
                    label="Both"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
          {checkLoftTiltBothField === "both" ? (
            <Grid>
              <TextField
                required
                id="leftLoftStartHeight"
                name="leftLoftStartHeight"
                label="Tilted ceiling starts at (height-left)?"
                fullWidth
                variant="standard"
                type="number"
              />
              <TextField
                required
                id="leftCeilingStarts"
                name="leftCeilingStarts"
                label="Tilt reaches ceiling at (width-left)"
                fullWidth
                variant="standard"
                type="number"
              />
              <TextField
                required
                id="rightLoftStartHeight"
                name="rightLoftStartHeight"
                label="Tilted ceiling starts at (height-right)?"
                fullWidth
                variant="standard"
                type="number"
              />
              <TextField
                required
                id="rightCeilingStarts"
                name="rightCeilingStarts"
                label="Tilt reaches ceiling at (width-right)"
                fullWidth
                variant="standard"
                type="number"
              />
              <TextField
                required
                id="midLoftWidth"
                name="midLoftWidth"
                label="How long is the horizontal ceiling part? (Leave 0 if it doesn't apply)"
                fullWidth
                variant="standard"
                type="number"
                value="0"
              />
            </Grid>
          ) : checkLoftTiltBothField === "leftToRight" ? (
            <Grid>
              {" "}
              <TextField
                required
                id="leftLoftStartHeight"
                name="leftLoftStartHeight"
                label="Tilted ceiling starts at (height-left)?"
                fullWidth
                variant="standard"
                type="number"
              />
              <TextField
                required
                id="leftCeilingStarts"
                name="leftCeilingStarts"
                label="Tilt reaches ceiling at (width-left)"
                fullWidth
                variant="standard"
                type="number"
              />
            </Grid>
          ) : checkLoftTiltBothField === "rightToLeft" ? (
            <Grid>
              {" "}
              <TextField
                required
                id="rightLoftStartHeight"
                name="rightLoftStartHeight"
                label="Tilted ceiling starts at (height-right)?"
                fullWidth
                variant="standard"
                type="number"
              />
              <TextField
                required
                id="rightCeilingStarts"
                name="rightCeilingStarts"
                label="Tilt reaches ceiling at (width-right)"
                fullWidth
                variant="standard"
                type="number"
              />
            </Grid>
          ) : (
            ""
          )}
          <form onSubmit={handleFormSubmit}>
            <Box sx={{ marginTop: 2 }}>
              <Button
                variant="outlined"
                endIcon={<SendIcon />}
                color="secondary"
                type="submit"
              >
                Ready to create?
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
