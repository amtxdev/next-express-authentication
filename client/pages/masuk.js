import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import { masuk } from "../utils/auth";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Masuk() {
  const classes = useStyles();
  const [userData, setUserData] = useState({ email: '', error: '' });
  const [userPwd, setUserPwd] = useState({ password: '', error: ''});

  async function handleSubmit(event) {
    event.preventDefault();
    setUserData(Object.assign({}, userData, {error: ''}));
    setUserPwd(Object.assign({}, userPwd, {error: ''}));

    const email = userData.email;
    const password = userPwd.password;
    const url = 'http://localhost:1000/autentikasi/masuk'

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (response.status === 200) {
        const { token } = await response.json();
        await login({ token });
      } else {
        console.log("Gagal Login.");
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error("Ada kesalahan pada kode atau masalah jaringan.", error);

      const { response } = error;
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message
        })
      );
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus
          value={userData.email} onChange={event => setUserData(Object.assign({}, userData, {email: event.target.value}))}/>

          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" value={userPwd.password} onChange={event => setUserPwd(Object.assign({}, userPwd, {password: event.target.value}))} autoComplete="current-password"/>

          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
