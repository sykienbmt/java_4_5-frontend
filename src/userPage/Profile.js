import { Margin } from '@mui/icons-material';
import { Box, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from 'src/components/home/Header';
import { userController } from 'src/controllers/UserController';
import './css/Profile.css';

export default function Profile() {
  const [user, setUser] = useState('');

  useEffect(() => {
    userController.getProfile().then((res) => {
      setUser(res);
    });
  }, []);
  console.log(user);
  return (
    <div>
      <Header />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box className="menu-container-profile">
              <div className="avatar-profile">
                <img
                  src="https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1652797817~hmac=057037e144559e2ee031f86ffebdb76a"
                  alt=""
                />
              </div>
              <ul>
                <li className="menu-profile-item">ABOUT</li>
                <li className="menu-profile-item">EXPERIENCE</li>
                <li className="menu-profile-item">EDUCATION</li>
                <li className="menu-profile-item">SKILL</li>
                <li className="menu-profile-item">AWARDS</li>
              </ul>
            </Box>
          </Grid>
          <Grid item xs={10} >
            {user !== '' ? (
              <Box
                sx={{
                  padding: '20px',
                  height:"100%",
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around'
                }}
              >
                <h1 className='name-user-bold'>{user.name.toUpperCase()}</h1>
                <h2>
                  CUMGAR DAKLAK - {user.phone} - {user.email}
                </h2>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, magnam magni
                  tempore doloremque corporis delectus optio id nostrum. Nobis voluptas ipsa quia?
                  Libero vero deserunt molestiae minus fuga eius quisquam!
                </p>

                <Box sx={{
                    display:"flex",
                    flexDirection:"row"
                }}>
                    <Box sx={{
                        width:"50px",
                        height:"50px",
                        img:{
                            objectFit:"cover"
                        },
                        marginRight: "10px"
                    }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="" />
                    </Box>
                    <Box sx={{
                        width:"50px",
                        height:"50px",
                        img:{
                            objectFit:"cover"
                        },
                        marginRight: "10px"
                    }}
                    >
                        <img src="https://cdn-icons.flaticon.com/png/512/3670/premium/3670032.png?token=exp=1652798981~hmac=0df39235fc8ef2d9f0748aa7bbd0f296" alt="" />
                    </Box>
                    <Box sx={{
                        width:"50px",
                        height:"50px",
                        img:{
                            objectFit:"cover"
                        },
                        marginRight: "10px"
                    }}
                    >
                        <img src="https://cdn-icons.flaticon.com/png/512/3670/premium/3670151.png?token=exp=1652799171~hmac=2d2a213cd04cbc1ce7596dc57d5e628e" alt="" />
                    </Box>
                </Box>
              </Box>
            ) : (
              <div>Profile not Found</div>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
