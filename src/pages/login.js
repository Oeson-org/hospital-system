import React, { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import { Phone as P } from '../icons/phone';
import { firebase } from "../components/firebase/firebase";
import { getAuth, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, setPersistence, signInWithRedirect, inMemoryPersistence, GoogleAuthProvider } from "firebase/auth";

const Login = () => {

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123',
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

  // Inputs
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState('');

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
      }
    }, auth);
  }

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
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

  const onSignInSubmit = (e) => {
    e.preventDefault();
    setUpRecaptcha();
    const phoneNumber = mynumber;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log('Captcha Resolved')
        const code = window.prompt("Enter OTP");
        confirmationResult.confirm(code).then((result) => {
          // User signed in successfully.
          const user = result.user;

        }).catch((error) => {
          console.error("Invalid Number")
        });

      }).catch((error) => {
        console.error("SMS Error")
        // ...
      });
  }

  // setPersistence(auth, inMemoryPersistence)
  //   .then(() => {

  //     // In memory persistence will be applied to the signed in Google user
  //     // even though the persistence was set to 'none' and a page redirect
  //     // occurred.
  //     return signInWithRedirect(auth, provider);
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });

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
              variant="h4"
              align="center"
            >
              Sign in
            </Typography>
          </Box>
          <Grid
            container
            spacing={3}
          >
            {/* <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid> */}

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

            <Grid
              item
              xs={16}
              md={16}
            >

              <TextField
                // error={Boolean(formik.touched.phone && formik.errors.phone)}
                fullWidth
                // helperText={formik.touched.phone && formik.errors.phone}
                label="Phone Number"
                margin="normal"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  setnumber(e.target.value)
                }}
                // type="phone"
                value={mynumber}
                variant="outlined"
              />
              <div id="recaptcha-container"></div>
              <Button
                color="info"
                fullWidth
                startIcon={<P />}
                onClick={onSignInSubmit}
                size="large"
                variant="contained"
              >

                Send SMS
              </Button>
            </Grid>

          </Grid>
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
