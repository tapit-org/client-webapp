// material-ui
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { CircularProgress } from "@mui/material";

// loader style
const LoaderWrapper = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  background: "white",
  opacity: 0.6,
  left: 0,
  zIndex: 2001,
  width: "100%",
  height: "100%",
  textAlign: "center",
  paddingTop: "50vh",
}));

// ==============================|| Loader ||============================== //

const OverlayLoader = () => (
  <LoaderWrapper>
    <CircularProgress color="primary" />
  </LoaderWrapper>
);

export default OverlayLoader;
