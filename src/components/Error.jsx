import { Button, Typography } from "@mui/material";

function Error() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Typography variant="h4">SmileThru</Typography>
      <Typography variant="subtitle1">Connection Error</Typography>
      <div className="">
        <Button
          variant="contained"
          onClick={() => (window.location = "/")}
          size="small"
        >
          Try Again!
        </Button>
      </div>
    </div>
  );
}

export default Error;
