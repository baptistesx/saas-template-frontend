import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CustomAppBar from "../components/CustomAppBar";
import CustomBodyLayout from "../components/CustomBodyLayout";
function Home() {
  return (
    <div>
      <CustomAppBar />

      <CustomBodyLayout>
        <Typography variant="h1">Bots list</Typography>

        <Link to="/workaway-messaging">
          <Button variant="contained">
            Workaway messaging
            <ArrowForwardIcon />
          </Button>
        </Link>
      </CustomBodyLayout>
    </div>
  );
}

export default Home;
