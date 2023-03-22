import GitHubIcon from "@mui/icons-material/GitHub";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, Button, Link, Switch } from "@mui/material";

export default function Header(props: any) {
  const { lightMode, setLightMode } = props;
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: "2px 2rem",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button variant="outlined" startIcon={<GitHubIcon />} size="small">
          <Link
            href="https://github.com/horaciosdev/react-notes"
            target="_blank"
            underline="none"
          >
            GitHub
          </Link>
        </Button>
        <Button
          variant="outlined"
          startIcon={<RocketLaunchIcon />}
          size="small"
        >
          <Link
            href="https://my-portfolio-ten-navy.vercel.app/"
            target="_blank"
            underline="none"
          >
            Portfolio
          </Link>
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DarkModeIcon />
        <Switch onChange={(e) => setLightMode(lightMode ? false : true)} />
        <LightModeIcon />
      </Box>
    </Box>
  );
}
