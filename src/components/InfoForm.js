import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const InfoForm = ({ setIsNextButtonDisabled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionResult, setconnectionResult] = useState();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    console.log(data.password);
    console.log("on submit");
    // if (data.email !== "" && data.password !== "") {
    setIsLoading(true);
    const res = await axios.post(`http://localhost:4999/startBot`, data);
    setIsLoading(false);
    console.log(res);
    //   setconnectionResult(res.data);
    //   setIsConnected(true);
    //   setIsNextButtonDisabled(false);
    // }
  };
  const theme = useTheme();

  // console.log(watch("example")); // watch input value by passing the name of it

  // const handleSubmit =

  const [cityAndCountry, setCityAndCountry] = useState("");

  const handleChangeCityAndCountry = (event) => {
    setCityAndCountry(event.target.value);
  };

  const [detectionRadius, setDetectionRadius] = useState("");

  const handleChangeDetectionRadius = (event) => {
    console.log("iin");
    console.log(event.target.value);
    setDetectionRadius(event.target.value);
  };

  return (
    <Box sx={{ width: "50%" }}>
      <Typography variant="h2">Info</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControlLabel
          control={<Checkbox />}
          label="Headless"
          {...register("headless")}
          sx={{ m: 1 }}
        />
        <TextField
          fullWidth
          placeholder="Email"
          {...register("email")}
          required
          sx={{ m: 1 }}
        />
        <TextField
          fullWidth
          placeholder="Password"
          {...register("password")}
          required
          sx={{ m: 1 }}
        />

        <TextField
          fullWidth
          placeholder="City"
          {...register("city")}
          required
          sx={{ m: 1 }}
        />

        <Controller
          name="detectionRadius"
          control={control}
          defaultValue=""
          rules={{ required: "Detection radius needed" }}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              select
              label="Detection radius"
              value={value}
              onChange={onChange}
              sx={{ m: 1 }}
            >
              <MenuItem value={5}>5 km</MenuItem>
              <MenuItem value={10}>10 km</MenuItem>
            </TextField>
          )}
        />

        <Box sx={{ minWidth: 180 }}>
          <TextField
            fullWidth
            id="minimimAge"
            label="Minimum age"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ m: 1 }}
            {...register("minimumAge")}
          />

          <TextField
            fullWidth
            id="maximumAge"
            label="Maximum age"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ m: 1 }}
            {...register("maximumAge")}
          />
        </Box>
        <TextField
          fullWidth
          // required
          id="outlined-required"
          label="Message subject"
          sx={{ m: 1 }}
          {...register("messageSubject")}
        />
        <TextField
          fullWidth
          // required
          id="outlined-required"
          label="English message"
          multiline
          rows={4}
          sx={{ m: 1 }}
          {...register("englishMessage")}
        />
        <TextField
          fullWidth
          // required
          id="outlined-required"
          label="French message"
          multiline
          rows={4}
          sx={{ m: 1 }}
          {...register("frenchMessage")}
        />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            sx={{
              m: 1,
            }}
            disabled={isConnected}
          >
            Start the bot !
          </LoadingButton>

          <LoadingButton
            // type="submit"
            variant="contained"
            loading={isLoading}
            sx={{
              m: 1,
            }}
            disabled={isConnected}
          >
            Stop the bot !
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default InfoForm;