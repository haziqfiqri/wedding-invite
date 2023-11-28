"use client";

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Crimson_Pro } from "next/font/google";

export const crimson = Crimson_Pro({
  subsets: ["latin"],
  preload: true,
});

const theme = createTheme({
  typography: {
    fontFamily: crimson.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#693B24",
      light: "#FFFFFF",
      dark: "#BDBDBD",
    },
  },
  breakpoints: {
    values: {
      xs: 360,
      sm: 440,
      md: 470,
      lg: 520,
      xl: 620,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

// declare module "@mui/material/styles" {
//   interface BreakpointOverrides {
//     xs: false; // removes the `xs` breakpoint
//     sm: false;
//     md: false;
//     lg: false;
//     xl: false;
//     mobile: true; // adds the `mobile` breakpoint
//     tablet: true;
//     tablet2: true;
//     desktop: true;
//   }
// }
