import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { setModalData, setPosts } from "../../store/actions/applicationActions";
import { clearPost, deletePost } from "../../store/actions/postActions";
import ActionButton from "../../primitives/action-button/actionButton.jsx";
import MODAL_TYPES from "../modalTypes";
import POST_ACTION_TYPES from "../../store/actionTypes/postActionTypes";

const DeletePost = () => {
    const {
        authenticated,
        posts,
        modalData,
        postAction,
    } = useSelector((state) => (
        {
            authenticated: state.application.authenticated,
            posts: state.application.posts,
            postAction: state.post.action,
            modalData: state.application.modalData || {},
            apiCallStatus: state.application.apiCallStatus,
        }
    ));
    const dispatch = useDispatch();

    const history = useHistory();

    const hideDeletePostModal = useCallback(() => {
        setModalData(dispatch, { type: MODAL_TYPES.NONE, visible: false });
    }, [dispatch]);

    useEffect(() => {
        if (postAction === POST_ACTION_TYPES.DELETE) {
            const postId = modalData.postId;

            clearPost(dispatch);
            hideDeletePostModal();

            const postsCopy = JSON.parse(JSON.stringify(posts));
            const deletedPostIndex = postsCopy.findIndex((post) => post.id === postId);

            if (deletedPostIndex >= 0) {
                postsCopy.splice(deletedPostIndex, 1);
                setPosts(dispatch, postsCopy);
            }

            toast.success("Post deleted successfully.");
            history.push("/posts");
        } else if (postAction === POST_ACTION_TYPES.ERROR) {
            toast.error("Error occurred when deleting Post data.");
        }
    }, [postAction, dispatch, hideDeletePostModal, history, posts, modalData.postId]);

    const handleDeletePost = () => {
        if (authenticated === true && modalData.postId) {
            deletePost(dispatch, modalData.postId);
        }
    };

    return (
        <Dialog
            open={ modalData.type === MODAL_TYPES.DELETE_POST && modalData.visible }
            onClose={ hideDeletePostModal }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Confirm Post delete
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete:
                    <b>&quot;{ modalData.postTitle }&quot;</b>
                    post?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ActionButton
                    text="Cancel"
                    color="default"
                    onClick={ hideDeletePostModal }
                />
                <ActionButton
                    actionName={ `deletePost${modalData.postId}` }
                    text="Confirm"
                    color="secondary"
                    onClick={ handleDeletePost }
                />
            </DialogActions>
        </Dialog>
    );
};

export default DeletePost;
