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
  FormControlLabel,
  Button,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { userController } from 'src/controllers/UserController';
import { UserContext } from 'src/contexts/UserContext';
import { setCookie } from 'src/helper/Cookies';

// ----------------------------------------------------------------------

export default function ForgotPassForm({setIsForgot}) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const userContext = useContext(UserContext);
  const [usernameSet, setUsernameSet] = useState('');
  const [code, setCode] = useState('');
  const [isShowRepass, setIsShowRepass] = useState(false);
  const [isShowCode, setIsShowCode] = useState(false);
  const [errCode,setErrCode]=useState("")
  const [errUsername,setErrUsername]=useState("")
  const [emailFromBE,setEmailFromBE]=useState("");
  const [isDisableUsername,setIsDisableUsername]=useState(false)
  const [isDisableCode,setIsDisableCode]=useState(false)


  const [state, setState] = useState({
    password: '',
    error: ''
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('username is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      remember: true
    },
    onSubmit: () => {
      if (isShowRepass == false) {
        console.log('send code');
      } else {
        userController.changePass(usernameSet, state.password).then((res) => {
          if(res==true){
            userContext.setMess("Change new password succesfully!")
            setIsForgot(false);
          }
        });
      }
    }
  });

  const sendCode = () => {
    userController.createCode(usernameSet).then((res) => {
      if(res==500){
        setErrUsername("Username does not exists !")
      }else{
        setEmailFromBE(res)
        setErrUsername("")
        setIsShowCode(true);
        setIsDisableUsername(true);
        userContext.setMess("Code send succesfully!")
      }
    });
  };

  const verifyCode = () => {
    const verInfo = {
      id: 0,
      email: emailFromBE,
      codes: code
    };
    // console.log(verInfo);
    userController.checkCode(verInfo).then((res) => {
      if(res==false){
        setErrCode("Your code is not correct !")
      }else{
        setErrCode("")
        setIsShowRepass(true)
        setIsDisableCode(true);
        userContext.setMess("Verfity succesfully!")
      }
    });
  };

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <TextField
              type="text"
              label="Username"
              value={usernameSet}
              onChange={(e) => setUsernameSet(e.target.value)}  
              disabled={isDisableUsername}
              sx={{ width: '70%' }}
            />

            <Button variant="outlined" sx={{ width: '25%' }} onClick={() => sendCode()}>
              Send code
            </Button>
          </Stack>
          <Typography sx={{ color: 'red', fontSize: '12px', textAlign: 'center',mt:0 }}>
                {errUsername}
              </Typography>

          {isShowCode ? (
            <>
              <Stack flexDirection={'row'} justifyContent={'space-between'}>
                <TextField
                  type="text"
                  label="Enter code from email"
                  value={code}
                  disabled={isDisableCode}
                  onChange={(e) => setCode(e.target.value)}
                  sx={{ width: '70%' }}
                />

                <Button variant="outlined" sx={{ width: '25%' }} onClick={() => verifyCode()}>
                  Verify code
                </Button>
              </Stack>
              <Typography sx={{ color: 'red', fontSize: '12px', textAlign: 'center',mt:0 }}>
                {errCode}
              </Typography>
            </>
          ) : (
            <></>
          )}

          {isShowRepass ? (
            <>
              <Typography variant="h4" gutterBottom></Typography>
              <Typography variant="h4">Change Pass</Typography>

              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Re-Password"
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

              <LoadingButton fullWidth size="large" type="submit" variant="contained">
                Reset Password
              </LoadingButton>
            </>
          ) : (
            <div></div>
          )}
        </Stack>

        <p>{state.error}</p>
      </Form>
    </FormikProvider>
  );
}
