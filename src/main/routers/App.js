import { Box, CssBaseline } from "@mui/material";
import { AuthView } from '../../presentation/views/index'
import UseAuthProvider from "../../domain/context/useAuth";
function App() {
  return (
    <UseAuthProvider>
      <Box
        component="main"
        minHeight='100vh'
      >
        <CssBaseline />
        <AuthView />
      </Box>
    </UseAuthProvider>
  );
}

export default App;
