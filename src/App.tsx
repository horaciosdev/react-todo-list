import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Kanban from "./pages/Kanban";
import { useState } from "react";
import Header from "./components/Header";
function App() {
  const [lightMode, setLightMode] = useState(false);

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#2196f3",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: "#ffffff",
        paper: "#f5f5f5",
      },
      text: {
        primary: "#000000",
        secondary: "#757575",
        disabled: "#bdbdbd",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#2196f3",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
      text: {
        primary: "#ffffff",
        secondary: "#b0bec5",
        disabled: "#757575",
      },
    },
  });

  return (
    <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
      <CssBaseline />
      <Header lightMode={lightMode} setLightMode={setLightMode} />
      <Kanban />
    </ThemeProvider>
  );
}

export default App;
