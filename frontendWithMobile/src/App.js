import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, Box, ThemeProvider } from "@mui/material";
import store from "./store/store";
import Navbar from "./components/header/Navbar";
import Sidebar from "./components/header/Sidebar";
import theme from "./components/helpers/theme";

const Login = lazy(() => import("./components/pages/Login"));
const Dashboard = lazy(() => import("./components/pages/dashboard/Dashboard"));
const CreateProject = lazy(() => import("./components/pages/CreateProject"));
const ProjectList = lazy(() => import("./components/pages/ProjectList"));

function App() {
  return (
    // <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="*"
              element={
                <Box sx={{ display: "flex", backgroundColor: '#f3f5f7', height: '100vh' }}>
                  <CssBaseline />
                  <Navbar />
                  <Sidebar />
                  <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, marginTop: "50px", }}
                  >
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route
                        path="/create-project"
                        element={<CreateProject />}
                      />
                      <Route path="/project-list" element={<ProjectList />} />
                    </Routes>
                  </Box>
                </Box>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
    // </Provider>
  );
}

export default App;
