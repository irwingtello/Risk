import React from "react";
import { useAccount } from "wagmi";
import "./Risk.css";
import "./Profile.css";
import Navbar from "./Navbar";

import RiskProfile from "./RiskProfile";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import FormControl from "@mui/material/FormControl";
import BaroImage from "./assets/BaroLogo.png";

export function Profile() {
  const { address, connector, isConnected } = useAccount();

  return (
    <React.Fragment>
      <Navbar isConnected={isConnected}></Navbar>
      <Box
        sx={{
          my: 8,
          mx: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={8} md={12} elevation={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <React.Fragment>
              <Box
                sx={{
                  my: 4,
                  mx: 12,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
               {/* <FormControl sx={{ m: -4 }}>
                 <img className="img" src={BaroImage} />
                 </FormControl> */}
                <FormControl sx={{ m: 4 }}>
                  <h1 className="h1">find out if your crypto portfolio is risky 😬 from a <span className="fast">professional risk manager.</span></h1>
                </FormControl>
                <FormControl sx={{ m: 0 }}>
                  <h3>
                    enter your token holdings and we'll email you a digestible,  actionable risk report built by a veteran risk manager.
                  </h3>
                  <br></br>
                  {/* <h1 className="h1">
                    Just add the assets you own, the number of tokens and
                     receive your personalized score.
                  </h1> */}
                </FormControl>
                <FormControl sx={{ m: 8 }}>
                  <RiskProfile />
                </FormControl>
              </Box>
            </React.Fragment>
          </Box>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
