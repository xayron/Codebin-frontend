import { Typography } from "@material-ui/core";

function Head() {
  return (
    <div>
      <div
        className="logo1"
        style={{
          margin: "1.5vw 0 0 2vw",
        }}
      >
        <Typography
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "calc(1.5 *calc(0.75vh + 0.75vw))",
          }}
        >
          Codebin
        </Typography>
      </div>
    </div>
  );
}

export default Head;
