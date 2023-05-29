import * as React from "react";
import axios from 'axios';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, createTheme, ThemeProvider } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme();

export default function SignIn() {
  const [rerender, setRerender] = React.useState(false); // Add this line

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://backend-esqp5xwphq-od.a.run.app/api/user/login';
      const response = await axios.post(BASE_URL, payload);

      if (response.status === 200 || response.status === 201) { 
        const token = response.data;
        if(token) {
          console.log("Login successful");
          localStorage.setItem('token', token); 
          window.location = '/home';
        } else {
          console.error("Invalid email or password");
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (e) {
      console.error('There has been a problem with your fetch operation: ' + e.message);
    }

    setRerender(!rerender); // Add this line
  }
  
  // Sign in form component
  return (  
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/SignUpP" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
