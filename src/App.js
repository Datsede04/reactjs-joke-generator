import { Chip, LinearProgress, Typography } from "@mui/material";
import Body from "./components/Body/Body";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Error from "./components/Error";

const apiEndPoint = "https://v2.jokeapi.dev/categories";

function App() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("Any");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(apiEndPoint, { timeout: 5000 });
        setCategories(data.categories);
        setCategory(data.categories[0]);
        //console.log("updated.", categories, category);
      } catch (error) {
        setError(true);
      }
    };
    fetchCategories();
  }, []);

  const getChipClass = (label) => {
    //console.log(label, category);
    return label === category ? "" : "outlined";
  };
  if (error) return <Error />;

  if (categories.length === 0)
    return (
      <>
        <Typography align="center">SmileThru</Typography>
        <Typography align="center">Connecting...</Typography>
        <LinearProgress />
      </>
    );

  return (
    <>
      <div className="catagories" align="center" style={{ margin: 10 }}>
        {categories.map((cat) => (
          <Chip
            label={cat}
            variant={getChipClass(cat)}
            style={{ margin: 3 }}
            key={cat}
            onClick={() => setCategory(cat)}
          />
        ))}
      </div>
      <Body category={category} />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        align="center"
      >
        <p>If u're too busy to smile, u are too busy.</p>
        <p>&copy;smilethru yabeye Nov, 2021</p>
      </div>
    </>
  );
}

export default App;
