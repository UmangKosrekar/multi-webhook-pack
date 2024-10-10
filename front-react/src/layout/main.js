// src/components/Layout.js
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Webhook Website</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
