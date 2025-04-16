import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { DashboardIcon, Grid } from "../utils/myMaterial";
import Navbar from "../components/Navbar";
import { useAuthStore } from '../store/authStore';
import DashboardPage from './DashboardPage';

const NAVIGATION = [
  {
    segment: 'dashboard/home',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  // {
  //   segment: 'dashboard/wallets',
  //   title: 'Wallets',
  //   icon: <AccountBalanceWalletIcon />,
  // },
  // {
  //   segment: 'dashboard/profile',
  //   title: 'Profile',
  //   icon: <BarChartIcon />,
  // },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  //console.log(pathname)
  return (
    <Grid container>
      <Grid size={12}>
        <DashboardPage />
      </Grid>
    </Grid>
  );
}

// DemoPageContent.propTypes = {
//   pathname: PropTypes.string.isRequired,
// };

function LayoutPage(props) {
  const { window } = props;
  const { user, logout } = useAuthStore();

  const [session, setSession] = React.useState({
    user: {
      name: user.name,
      email: user.email,
      image: 'avatar.svg',
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: user.name,
            email: user.email,
            image: 'avatar.svg',
          },
        });
      },
      signOut: () => {
        logout();
        setSession(null);
      },
    };
  }, []);

  const router = useDemoRouter('/dashboard/home');
  //  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}>
      <DashboardLayout slots={{ appTitle: Navbar }} defaultSidebarCollapsed>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>

    // preview-end
  );
}

// LayoutPage.propTypes = {
//   window: PropTypes.func,
// };

export default LayoutPage;