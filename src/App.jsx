import { Route, Routes } from "react-router-dom"
import { useState, useEffect, useRef } from 'react'
import Header from "./components/header/Header"
import Dashboard from "./pages/dashboard/Dashboard"
import { styled } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material"
import { theme } from "./theme/theme"
import './assets/sass/app.scss'

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(5),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `${drawerWidth}px`,
      "@media only screen and (max-width:900px)": {
        marginLeft: "0px",
        padding: theme.spacing(2),
      },
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
);

function App() {

  const dashboardRef = useRef()

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth)
      if(windowWidth > 900)
      setOpen(open => !open)
    })
  }, []) // empty dependancy array runs it once after react rendered

  const chartDataUpdate = () => {
    dashboardRef.current.chartDataupdateFunction()
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <div className="react-content">
        <Header chartDataupdateFunction={chartDataUpdate}/>
        <Main open={open}>
          <Routes>
            <Route path="/" element={<Dashboard ref={dashboardRef} />} />
            <Route path="*" element={<Dashboard ref={dashboardRef}/>} />
          </Routes>
        </Main>
      </div>
    </ThemeProvider>
    </>
  )
}

export default App
