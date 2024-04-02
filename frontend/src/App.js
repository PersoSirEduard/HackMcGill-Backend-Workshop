import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';
import MenuBar from './MenuBar';
import AppContainer from './AppContainer';
import { AuthProvider } from './AuthProvider';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <MenuBar/>
        <AppContainer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
