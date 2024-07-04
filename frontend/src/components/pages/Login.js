import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, InputAdornment, styled } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginLayout from "../helpers/LoginLayout";
import { CustomButton, CustomTextField, CustomTypography } from "../helpers/CustomFields";
import { login } from '../../store/actions';

const ErrorText = styled(Typography)({
  marginTop: "30px",
  color: "#d62f2f",
  textAlign: "center",
  fontSize: "12px",
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = useSelector(state => state.user.loginUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (loginUser?.userInfo) {
      navigate("/dashboard");
    }
  }, [loginUser, navigate]);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <LoginLayout error={!!loginUser}>
      <Typography component="div" align="center" sx={{ m: 2, pb: 2 }} style={{ fontSize: "16px" }}>
        Login to get started
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box style={{ height: "90px" }}>
          <CustomTypography color={emailError ? "error" : "textPrimary"}>Email</CustomTypography>
          <CustomTextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
        </Box>
        <Box style={{ height: "90px" }}>
          <CustomTypography color={passwordError ? "error" : "textPrimary"}>Password</CustomTypography>
          <CustomTextField
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={
              <Box display="flex" justifyContent="space-between">
                <Typography variant="caption">{passwordError}</Typography>
                <Link
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{ color: "#0470d4", textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </Box>
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mt={3}>
          <CustomButton type="submit" variant="contained">Login</CustomButton>
        </Box>
      </form>
      {loginUser && <ErrorText>{loginUser.message}</ErrorText>}
    </LoginLayout>
  );
};

export default Login;
