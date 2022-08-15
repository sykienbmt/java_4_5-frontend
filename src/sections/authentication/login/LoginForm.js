import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { userController } from 'src/controllers/UserController';
import { parseJwt, UserContext } from 'src/contexts/UserContext';
import { setCookie } from 'src/helper/Cookies';

// ----------------------------------------------------------------------

export default function LoginForm({ setIsForgot }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const userContext = useContext(UserContext);
  const [state, setState] = useState({
    username: '',
    password: '',
    error: ''
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('username is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    onSubmit: () => {
      userController.login(state.username, state.password).then((res) => {
        if (res == 403) {
          setState((prev) => ({ ...prev, error: 'Username or password is incorrect' }));
        } else {
          const value = parseJwt(localStorage.getItem('accessToken'));
          userController.getMe(value.sub).then((res) => {
            userContext.setUser(res);


            if (res.role === 'admin') {
              navigate('/dashboard/app');
            } else {
              navigate('/home');
            }


          });
        }
      });
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="Username"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            value={state.username}
            onChange={(e) => setState((prev) => ({ ...prev, username: e.target.value }))}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            value={state.password}
            onChange={(e) => setState((prev) => ({ ...prev, password: e.target.value }))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{  }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link
            component={RouterLink}
            variant="subtitle2"
            to="#"
            underline="hover"
            onClick={() => setIsForgot(true)}
          >
            Forgot password?
          </Link>
        </Stack>

        <p style={{textAlign:"center",color:"red",fontWeight:"700", marginBottom:"10px"}}>{state.error}</p>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
