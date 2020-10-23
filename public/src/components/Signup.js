import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { selectUser } from "../redux/slices/userSlice";
import { signupPetOwner } from "../redux/slices/petOwnerSlice";
import { signupCareTaker } from "../redux/slices/careTakerSlice";
import { signupFTCareTaker } from "../redux/slices/fullTimeCareTakerSlice";
import { signupPTCareTaker } from "../redux/slices/partTimeCareTakerSlice";
import { useDispatch, useSelector } from "react-redux";
import CareTakerSignUp from "./CareTakerSignUp";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(10),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup(props) {
  const { open, onClose } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState({
    selected: {
      caretaker: false,
      petowner: false,
      type: null,
    },
  });

  const signup = () => {
    console.log(roles.selected);

    if (username !== "" && password !== "") {
      if (roles.selected.caretaker && roles.selected.petowner) {
        dispatch(
          signupCareTaker(
            username,
            password,
            ["caretaker", "petowner"],
            roles.selected.type
          )
        );
        dispatch(signupPetOwner(username, password, ["caretaker", "petowner"]));
      } else if (roles.selected.caretaker) {
        //console.log("Sign up for caretaker");
        dispatch(
          signupCareTaker(
            username,
            password,
            ["caretaker"],
            roles.selected.type
          )
        );
      } else if (roles.selected.petowner) {
        //console.log("Sign up for petowner");
        dispatch(signupPetOwner(username, password, ["petowner"]));
      } else {
      }

      onClose();
    }
  };

  const toggleOptionAllowMultiple = (e) => {
    const key = e.currentTarget.value;
    const value = !roles.selected[key];
    const newSelected = Object.assign(roles.selected, { [key]: value });
    setRoles({ selected: newSelected });
  };

  const getStyle = (key) => {
    return roles.selected[key] ? "primary" : "default";
  };

  const getStyle2 = (key) => {
    return roles.selected["type"] === key ? "primary" : "default";
  };

  const toggleOptionAllowOne = (e) => {
    const value = e.currentTarget.value;
    const newSelected = Object.assign(roles.selected, { ["type"]: value });
    setRoles({ selected: newSelected });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: { borderRadius: 10 },
      }}
    >
      <DialogContent>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <div className={classes.form}>
              <ButtonGroup fullWidth variant="outlined" bsStyle="default">
                <Button
                  fullWidth
                  onClick={(e) => toggleOptionAllowMultiple(e)}
                  value="caretaker"
                  color={getStyle("caretaker")}
                >
                  Caretaker
                </Button>
                <Button
                  fullWidth
                  onClick={(e) => toggleOptionAllowMultiple(e)}
                  value="petowner"
                  color={getStyle("petowner")}
                >
                  PetOwner
                </Button>
              </ButtonGroup>
              {roles.selected.caretaker && (
                <ButtonGroup fullWidth variant="outlined" bsStyle="default">
                  <Button
                    fullWidth
                    color={getStyle2("fulltime")}
                    value="fulltime"
                    className={classes.submit}
                    onClick={(e) => toggleOptionAllowOne(e)}
                  >
                    Full-Time
                  </Button>
                  <Button
                    fullWidth
                    color={getStyle2("parttime")}
                    value="parttime"
                    className={classes.submit}
                    onClick={(e) => toggleOptionAllowOne(e)}
                  >
                    Part-Time
                  </Button>
                </ButtonGroup>
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                type="text"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={signup}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

// <DialogContentText>
//         Please enter a username and password to signup an account for
//         PetLovers!
//       </DialogContentText>
//       <TextField
//         autoFocus
//         label="Username"
//         type="text"
//         fullWidth
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <TextField
//         autoFocus
//         label="Password"
//         type="password"
//         fullWidth
//         onChange={(e) => setPassword(e.target.value)}
//       />
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onClose}>Cancel</Button>
//       <Button onClick={signup}>Login</Button>
//     </DialogActions>