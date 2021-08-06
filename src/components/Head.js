import { Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

function Head() {
  return (
    <div>
      <div
        className="logo1"
        style={{
          margin: "1.5vw 0 0 1.5vw",
        }}
      >
        <Button disableRipple
          component={Link} to="/"
        >
          <Typography
            style={{
              color: "white",
              fontWeight: "bold",
              // fontSize: "calc(1.3 *calc(0.75vh + 0.75vw))",
              fontSize: 20,
              marginBottom: 0,
              textTransform: 'none',
            }}
          >
            Codebin
          </Typography>
        </Button>
      </div>
    </div >
  );
}

export default Head;
