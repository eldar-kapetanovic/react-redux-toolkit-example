import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import ActionButton from "../../primitives/action-button/actionButton";
import { setModalData } from "../../store/actions/applicationActions";
import MODAL_TYPES from "../modalTypes";

const ConfirmDialog = () => {
    const { modalData } = useSelector((state) => ({
        modalData: state.application.modalData || {},
    }));
    const dispatch = useDispatch();

    const hideConfirmDialog = () => {
        setModalData(dispatch, { type: MODAL_TYPES.NONE, visible: false });
    };

    const handleConfirmAction = () => {
        if (typeof modalData.confirmAction === "function") {
            modalData.confirmAction();
        }

        hideConfirmDialog();
    };

    return (
        <Dialog
            open={ modalData.type === MODAL_TYPES.CONFIRM_DIALOG && modalData.visible }
            onClose={ hideConfirmDialog }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                { modalData.title || "Confirm action" }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    { typeof modalData.description === "function" ?
                        <modalData.description />
                        : modalData.description }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ActionButton
                    text="Cancel"
                    color="default"
                    actionName={ modalData.confirmActionName }
                    onClick={ hideConfirmDialog }
                />
                <ActionButton
                    text="Confirm"
                    color="secondary"
                    onClick={ handleConfirmAction }
                />
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
