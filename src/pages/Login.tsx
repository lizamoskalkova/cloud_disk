import {
  Stack,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useRef, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

interface State {
  password: string;
  showPassword: boolean;
}

export const Login = () => {
  const emailRef = useRef<any>();
  const navigate = useNavigate();
  const { signIn } = useAuth();
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
    const { error } = await signIn({ email, password });

    if (error) {
      alert("error logging in");
    } else {
      navigate("/");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
            )
          }}
          label="Password"
        />
        <Button variant="contained" onClick={handleSubmit}>
          Log in
        </Button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </Stack>
    </form>
  );
};
