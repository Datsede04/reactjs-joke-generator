import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import "./Body.css";
import Error from "../Error";

const apiEndPoint = "https://v2.jokeapi.dev/joke";

function Body({ category }) {
  const [jokeObj, setJoke] = useState(null);
  const [flags, setFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [delivery, setDelivery] = useState(false);

  const fetchJoke = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(apiEndPoint + "/" + category, {
        timeout: 5000,
      });
      const filtered = Object.entries(data.flags).filter((flag) => flag[1]);
      setJoke(data);
      setFlags(filtered);
      setIsLoading(false);
      setDelivery(false);
    } catch (error) {
      setIsError(true);
    }
  };

  const getJokeDelivery = () => {
    return delivery ? jokeObj.delivery : "guess :)";
  };
  const getActionButton = () => {
    if (jokeObj.type === "twopart" && !delivery) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDelivery(true)}
        >
          Tell Me !
        </Button>
      );
    }
    return (
      <Button variant="contained" color="primary" onClick={() => fetchJoke()}>
        Another !
      </Button>
    );
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  if (isError) return <Error />;
  if (!jokeObj) return <LinearProgress />;

  return (
    <Grid container className="container">
      <Grid item xs={12} sm={6} lg={4}>
        <Card className="card">
          {!jokeObj && <LinearProgress />}
          <CardContent>
            <Typography variant="h6" align="center">
              {jokeObj.category} Joke
            </Typography>
            <div className="text">
              <Typography className="message set-up">
                {jokeObj.type === "single" && jokeObj.joke}
                {jokeObj.type === "twopart" && jokeObj.setup}
              </Typography>
              <div className="spacer" />
            </div>

            {(jokeObj.type === "twopart" || isLoading) && (
              <div className="text">
                <div className="spacer" />
                {isLoading && <CircularProgress />}
                <Typography className="message delivery">
                  {isLoading ? "Loading ..." : getJokeDelivery()}
                </Typography>
              </div>
            )}
            <ul className="tags">
              {flags.map((flag) => (
                <li key={flag[0]}>#{flag[0]}</li>
              ))}
            </ul>
          </CardContent>

          <CardActions className="action">
            <div className="spacer" />
            {getActionButton()}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Body;
