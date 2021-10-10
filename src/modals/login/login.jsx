import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import ActionButton from "../../primitives/action-button/actionButton";
import {
    addApiCallStatus,
    removeApiCallStatus,
    setModalData,
} from "../../store/actions/applicationActions";
import MODAL_TYPES from "../modalTypes";
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(" ");
    const [passwordError, setPasswordError] = useState(" ");
    const [errorMessage, setErrorMessage] = useState(" ");
    const { modalData: { type, visible }, apiCallStatus } =
        useSelector((state) => ({
            modalData: state.application.modalData || {},
            apiCallStatus: state.application.apiCallStatus,
        }));
    const dispatch = useDispatch();

    useEffect(() => {
        if (!visible) {
            setUsername("");
            setPassword("");
            setUsernameError(" ");
            setPasswordError(" ");
            setErrorMessage("");
        }
    }, [type, visible]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setUsernameError(" ");
        setErrorMessage("");
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordError(" ");
        setErrorMessage("");
    };

    const hideLoginModal = () => {
        setModalData(dispatch, { type: MODAL_TYPES.NONE, visible: false });
    };

    const handleLogin = () => {
        let error = false;

        if (!username.trim()) {
            setUsernameError("Please enter your username.");
            error = true;
        }

        if (!password.trim()) {
            setPasswordError("Please enter your password.");
            error = true;
        }

        if (error) {
            return;
        }

        addApiCallStatus(
            dispatch,
            { callerId: "Login", isComponent: false }
        );
        signInWithEmailAndPassword(getAuth(), username, password)
            .then(() => {
                hideLoginModal();
            })
            .catch((signInError) => {
                setErrorMessage(signInError.message);
            })
            .finally(() => {
                removeApiCallStatus(dispatch, "Login");
            });
    };

    return (
        <Dialog
            open={ type === MODAL_TYPES.LOGIN && visible }
            onClose={ hideLoginModal }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Login
            </DialogTitle>
            <DialogContent className="loginDialogContent">
                <div className="formLine">
                    <TextField
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                        required
                        id="username"
                        label="Email"
                        type="email"
                        fullWidth
                        error={ Boolean(usernameError.trim()) }
                        helperText={ usernameError }
                        value={ username }
                        onChange={ handleUsernameChange }
                        disabled={ apiCallStatus.ongoing }
                    />
                </div>
                <div className="formLine">
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        error={ Boolean(passwordError.trim()) }
                        helperText={ passwordError }
                        value={ password }
                        onChange={ handlePasswordChange }
                        disabled={ apiCallStatus.ongoing }
                    />
                </div>
                <DialogContentText className="errorMessage">
                    { errorMessage }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ActionButton
                    text="Cancel"
                    color="default"
                    onClick={ hideLoginModal }
                />
                <ActionButton
                    actionName="Login"
                    text="Login"
                    onClick={ handleLogin }
                />
            </DialogActions>
        </Dialog>
    );
};

export default Login;
