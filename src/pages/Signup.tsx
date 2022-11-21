import { useRef, useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface State {
  password: string;
  showPassword: boolean;
}

export const Signup = () => {
  const emailRef = useRef<any>();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: true,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = values.password;
    const { error } = await signUp({ email, password });

    if (error) {
      alert("error signing in");
    } else {
      console.log("aa");
      navigate("/");
    }
  }

  return (
    <Stack
      sx={{
        alignItems: "center",
        mt: 10,
      }}
    >
      Welcome to your Cloud Disk!
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          spacing: 10,
          mt: 6,
        }}
      >
        <TextField
          inputRef={emailRef}
          id="outlined-basic"
          sx={{ mb: 5, width: 230 }}
          label="Email"
          variant="outlined"
        />
        <TextField
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          sx={{ mb: 5 }}
          onChange={handleChange("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Password"
        />
        <Button onClick={handleSubmit} variant="contained">
          Sign Up
        </Button>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </Stack>
    </Stack>
  );
};
