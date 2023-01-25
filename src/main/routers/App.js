import { Box, CssBaseline } from "@mui/material";
import { AuthView} from '../../presentation/views/index'

function App() {
  return (
    <Box
      component="main"
      minHeight='100vh'
    >
      <CssBaseline />
      <AuthView />
    </Box>
  );
}

export default App;
