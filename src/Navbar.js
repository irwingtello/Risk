import React, { useState, useContext } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  useAccount,
  useConnect,
  useDisconnect,
  usePrepareContractWrite,
} from "wagmi";
import "./Navbar.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Navbar = (props) => {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const theme = createTheme({
    palette: {
      primary: {
        // main: "#004AAD",
        main: "#536976",
      },
      secondary: {
        main: "#f44336",
      },
    },
  });
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              riskit
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Navbar;
