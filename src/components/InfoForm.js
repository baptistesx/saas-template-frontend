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
import { ENDPOINT } from "../utils/constants";

const InfoForm = () => {
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onStartBotClick = async (data) => {
    console.log(data);
    setIsStarting(true);

    const res = await axios.post(`${ENDPOINT}startBot`, data);

    if (res.status === 200) {
      setIsRunning(true);
    }

    setIsStarting(false);
  };

  const onStopBotClick = async () => {
    setIsStopping(true);

    const res = await axios.get(`${ENDPOINT}stopBot`);

    if (res.status === 200) {
      setIsRunning(false);
    }

    setIsStopping(false);
  };

  return (
    <Box sx={{ width: "45%", minWidth: "320px", m: 1 }}>
      <form onSubmit={handleSubmit(onStartBotClick)}>
        <Card sx={{ p: 1 }}>
          <CardContent>
            <Typography variant="h2">Info</Typography>

            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Dev mode (don't send messages)"
              {...register("developmentMode")}
              sx={{ m: 1 }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
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
              defaultValue="paris"
            />

            <Controller
              name="detectionRadius"
              control={control}
              defaultValue={5}
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
                  <MenuItem value={20}>20 km</MenuItem>
                  <MenuItem value={50}>50 km</MenuItem>
                  <MenuItem value={100}>100 km</MenuItem>
                  <MenuItem value={250}>250 km</MenuItem>
                  <MenuItem value={500}>500 km</MenuItem>
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
                defaultValue="20"
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
                defaultValue="30"
              />
            </Box>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Message subject"
              sx={{ m: 1 }}
              {...register("messageSubject")}
            />
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="English message"
              multiline
              rows={4}
              sx={{ m: 1 }}
              {...register("englishMessage")}
            />
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="French message"
              multiline
              rows={4}
              sx={{ m: 1 }}
              {...register("frenchMessage")}
            />
          </CardContent>
          <CardActions>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isStarting}
              sx={{
                m: 1,
              }}
              disabled={isRunning}
            >
              Start the bot !
            </LoadingButton>

            <LoadingButton
              variant="contained"
              loading={isStopping}
              sx={{
                m: 1,
              }}
              disabled={!isRunning}
              onClick={onStopBotClick}
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
