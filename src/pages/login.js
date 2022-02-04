import React, { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Google as GoogleIcon } from '../icons/google';
import { auth, googleProvider, popOut } from '../components/firebase/firebase';

// import { Facebook as FacebookIcon } from '../icons/facebook';
// import { Phone as P } from '../icons/phone';

const Login = () => {

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required'),
    }),
    onSubmit: () => {
      router.push('/');
    }
  });

  const googleSignIn = () => {
    popOut(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>

          <Box sx={{ my: 5 }}>
            <Typography
              color="textPrimary"
              variant="h2"
              align="center"
            >
              Sign in
            </Typography>
          </Box>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={16}
              md={16}
            >
              <Button
                fullWidth
                color="error"
                startIcon={<GoogleIcon />}
                onClick={googleSignIn}
                size="large"
                variant="contained"
              >
                Login with Google
              </Button>
              <br />
            </Grid>
          </Grid>
          <Box
            sx={{
              pb: 1,
              pt: 3
            }}
          >
            <Typography
              align="center"
              color="textSecondary"
              variant="body1"
            >
              or login with email address
            </Typography>
          </Box>
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign In Now
            </Button>
          </Box>


          <br />
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Don&apos;t have an account?
            {' '}
            <NextLink
              href="/register"
            >
              <Link
                to="/register"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: 'pointer'
                }}
              >
                Sign Up
              </Link>
            </NextLink>
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Login;
