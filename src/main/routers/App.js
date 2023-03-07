import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../hooks/protected-route";
import { RestrictedRoute } from "../hooks/restricted-route";
import { useAuth } from "../../domain/context/useAuth";
import { useEffect } from "react";
import { loadToken, setToken } from "../../presentation/hooks/acess-token";
import { validateTokenUseCase } from "../../domain/useCases/remote-auth-useCase";
import { logout } from "../../presentation/hooks/logout";
import { MakeAuthView, MakeClienteView, MakeHomeView, MakeGroupView } from './useCases/'
import { CssBaseline } from "@mui/material";
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
          setToken(token)
        }).catch(() => {
          logout(setUser)
        })
    }
    verifyUserAlreadyLogged();
    // eslint-disable-next-line
  }, [])
  return (
    <BrowserRouter>
      <Layout>
        <CssBaseline />
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="/" element={<MakeHomeView />} />
            <Route path='/clientes' element={<MakeClienteView />} />
            <Route path="/grupos" element={<MakeGroupView />} />
          </Route>
          <Route>
            <Route element={<RestrictedRoute user={user} />}>
              <Route path="auth" element={<MakeAuthView />} />
            </Route>
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter >

  );
}

export default App;
