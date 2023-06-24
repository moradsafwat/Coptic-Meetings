import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAsyncError, useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, inputAdornmentClasses } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Swal from 'sweetalert2';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const errInput = () => {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: 'Username Or Password Something went wrong!',
    });
  };

  const errInputNull = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Please Enter username and password',
    });
  };
  const handleClick = () => {
    if (userName && password) {
      axios
        .post('http://www.coptic-meeting.somee.com/api/person/login', { userName, password })
        .then((response) => {
          // console.log(response);
          navigate('/dashboard', { replace: true });

          // Handle response
        })
        .catch((error) => {
          // console.error(error);
          console.log('invalid userName or pass');
          errInput();
        });
      // console.log(`your user name is ${userName} and pass is ${password}`);
    } else {
      errInputNull();
      console.log('username and password is null');
    }
  };

  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });
  // };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          required
          name="text"
          label="User Name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <TextField
          required
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
