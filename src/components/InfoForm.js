import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardActions,
  CardContent,
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

const InfoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    const res = await axios.post(`http://localhost:4999/startBot`, data);
    if (res.status === 200) {
      setIsRunning(true);
    }
    setIsLoading(false);
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

  const handleClickStopBot = async () => {
    setIsStopping(true);

    const res = await axios.get(`http://localhost:4999/stopBot`);

    if (res.status === 200) {
      console.log("bot well stopped");
      setIsRunning(false);
    }

    setIsStopping(false);
  };

  return (
    <Box sx={{ width: "45%", minWidth: "320px", m: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 1 }}>
          <CardContent>
            <Typography variant="h2">Info</Typography>

            <FormControlLabel
              control={<Checkbox />}
              label="Dev mode (don't send messages)"
              {...register("developmentMode")}
              sx={{ m: 1 }}
            />
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
              type={"password"}
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

            {/* <Box sx={{ display: "flex", alignItems: "center" }}></Box> */}
          </CardContent>
          <CardActions>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{
                m: 1,
              }}
              disabled={isConnected || isRunning}
            >
              Start the bot !
            </LoadingButton>

            <LoadingButton
              // type="submit"
              variant="contained"
              loading={isStopping}
              sx={{
                m: 1,
              }}
              disabled={isConnected || !isRunning}
              onClick={handleClickStopBot}
            >
              Stop the bot !
            </LoadingButton>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
};

export default InfoForm;
