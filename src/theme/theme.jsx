import { createTheme } from "@mui/material"

export const theme = createTheme({
  
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 901,
      lg: 1200,
      xl: 1536,
    }
  },

  palette: {
    secondary:{
      main: "#9c27b0",
      contrastText: "#fff",
    },
    action: {
      active: "#000",
      selected: "rgba(71, 183, 71, 1)",
    },
    notificationBadgeColor:{
      main: "rgba(71, 183, 71, 1)",
    },
  },
  
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "transparent",
          backgroundColor: "rgba(219, 239, 249, 1)",
          color: "#76BD80",
          fontWeight: "700",

          ":hover": {
            borderColor: "#76BD80",
            backgroundColor: "rgba(219, 239, 249, 1)",
          }
        }
      }
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          minWidth: "fit-content",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {},
        input: {
          padding: "9px 16px !important",
          paddingRight: "32px !important",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          color: "#ccc"
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          color: "#000"
        }
      }
    },
    MuiTableCell: {
      styleOverrides:{
        root: {
          color: "inherit",
          border:0,
          fontWeight: 700,
          padding: "10px 1rem",
        }
      }
    },
    
  }
})