import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getAuth, signOut  } from "firebase/auth";

import ActionButton from "../../primitives/action-button/actionButton";
import { setModalData } from "../../store/actions/applicationActions";
import MODAL_TYPES from "../modalTypes";

const Logout = () => {
    const { modalData: { type, visible } } = useSelector((state) => ({
        modalData: state.application.modalData || {},
    }));
    const dispatch = useDispatch();
    const history = useHistory();

    const hideLogoutModal = () => {
        setModalData(dispatch, { type: MODAL_TYPES.NONE, visible: false });
    };

    const handleLogout = () => {
        signOut(getAuth());
        hideLogoutModal();
        history.push("/posts");
    };

    return (
        <Dialog
            open={ type === MODAL_TYPES.LOGOUT && visible }
            onClose={ hideLogoutModal }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Confirm Logout
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to <b>&quot;Logout&quot;</b>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ActionButton
                    text="Cancel"
                    color="default"
                    onClick={ hideLogoutModal }
                />
                <ActionButton
                    text="Confirm"
                    color="secondary"
                    onClick={ handleLogout }
                />
            </DialogActions>
        </Dialog>
    );
};

export default Logout;
