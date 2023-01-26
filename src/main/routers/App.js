import { CssBaseline } from "@mui/material";
import { AuthView, HomeView } from '../../presentation/views/index'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../hooks/protected-route";
import { RestrictedRoute } from "../hooks/restricted-route";
import { useAuth } from "../../domain/context/useAuth";
import { useEffect } from "react";
import { loadToken, removeToken } from "../../presentation/hooks/acess-token";
import { validateTokenUseCase } from "../../domain/useCases/remote-auth-useCase";
import Layout from "../../presentation/components/layout/layout";
function App() {
  const { user, setUser } = useAuth()
  useEffect(() => {
    const verifyUserAlreadyLogged = async () => {
      const token = loadToken()
      if (!token) return
      await validateTokenUseCase(token)
        .then((response) => {
          setUser(response)
        }).catch(() => {
          removeToken()
        })
    }
    verifyUserAlreadyLogged();
    // eslint-disable-next-line
  }, [])
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="/" element={<HomeView />} />
          </Route>
          <Route>
            <Route element={<RestrictedRoute user={user} />}>
              <Route path="auth" element={<AuthView />} />
            </Route>
          </Route>
        </Routes>
        <CssBaseline />
      </Layout>
    </BrowserRouter >

  );
}

export default App;
