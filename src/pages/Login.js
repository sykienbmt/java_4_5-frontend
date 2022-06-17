import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { LoginForm } from '../sections/authentication/login';
import AuthSocial from '../sections/authentication/AuthSocial';
import ForgotPassForm from 'src/sections/authentication/login/ForgotPassForm';
import { useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const [isForgot, setIsForgot] = useState(false);

  console.log(isForgot);
  return (
    <RootStyle title="Login">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          Register
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Hi, Welcome Back
        </Typography>
        <img src="/static/illustrations/illustration_login.png" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          {isForgot == false ? (
            <>
              <Stack sx={{ mb: 5 }}>
                <Typography variant="h4" gutterBottom></Typography>
                <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
              </Stack>
              <AuthSocial />
            </>
          ) : (
            <>
              <Stack sx={{ mb: 5 }} justifyContent={'space-between'} flexDirection={"row"}>
                {/* <Typography variant="h4" gutterBottom></Typography> */}
                <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                  Forgot Password
                </Typography>
                <Link component={RouterLink} variant="subtitle2" to="#" underline="hover" onClick={()=>setIsForgot(false)} >
                  Back to Login
                </Link>

              </Stack>
            </>
          )}
          {isForgot == false ? (
            <LoginForm setIsForgot={setIsForgot} />
          ) : (
            <ForgotPassForm setIsForgot={setIsForgot} />
          )}

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: 'none' }
            }}
          >
            Don’t have an account?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to="register" underline="hover">
              Get started
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
