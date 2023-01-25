import { Box, CssBaseline } from "@mui/material";
import { AuthView, HomeView } from '../../presentation/views/index'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../hooks/protected-route";
import { RestrictedRoute } from "../hooks/restricted-route";
import { useAuth } from "../../domain/context/useAuth";
function App() {
  const { user } = useAuth()
  return (
    <BrowserRouter>
      <Box
        component="main"
        minHeight='100vh'
      >
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="/" element={<HomeView />} />
          </Route>
          <Route>
            <Route element={<RestrictedRoute user={user}/>}>
              <Route path="auth" element={<AuthView />} />
            </Route>
          </Route>
        </Routes>
        <CssBaseline />
      </Box>
    </BrowserRouter >

  );
}

export default App;
