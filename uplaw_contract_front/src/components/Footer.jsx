import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "black",
        height: "10rem",
        padding: "3rem",
      }}
    >
      <Grid2 container sx={{ justifyContent: "center" }}>
        <Grid2 xs={12} sm={6} md={6} lg={6} xl={4}>
          <Typography color="whitesmoke">footer here</Typography>
        </Grid2>
        <Grid2 xs={12} sm={6} md={6} lg={6} xl={4}>
          <Typography color="whitesmoke">footer here</Typography>
        </Grid2>
      </Grid2>
    </footer>
  );
};

export default Footer;
