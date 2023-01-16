import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { MovieCreationRounded } from "@mui/icons-material";
import CameraIcon from "@mui/icons-material/Camera";

import Movies from "../Movies/Movies";
import Directors from "../Directors/Directors";

const TabContainer = ({ children }: { children: React.ReactNode }) => (
  <Typography component="div" style={{ padding: 8 * 3 }}>
    {children}
  </Typography>
);

const SimpleTabs = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={(e, value) => setValue(value)}
        >
          <Tab label="Movies" icon={<CameraIcon />} />
          <Tab label="DirectorsTable" icon={<MovieCreationRounded />} />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <Movies />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <Directors />
        </TabContainer>
      )}
    </div>
  );
};

export default SimpleTabs;
