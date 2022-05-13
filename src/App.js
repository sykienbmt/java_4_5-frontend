// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { UserContextProvider, UserProvider } from './contexts/UserContext';
import { CartContextProvider } from './contexts/CartContext';
import './app.css'

// ----------------------------------------------------------------------

export default function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router />
      </ThemeConfig>
      </CartContextProvider>
    </UserContextProvider>
    // <HomePage />
  );
}
