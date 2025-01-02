import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#3f51b5",
          padding: "10px 20px",
        }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            Fabolus interView Test
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
