import ApiCalls from "../../services/apiCalls";
import { applicationActions } from "../storeSlices/applicationSlice";
import { commentActions } from "../storeSlices/commentSlice";

export const addComment = (postId, commentIndex, commentData) => {
    return (dispatch) => {
        const apiCalls = new ApiCalls();

        dispatch(applicationActions.addApiCallStatus(
            { callerId: `SaveComment${commentIndex}`, isComponent: false }
        ));
        apiCalls.apiAddComment(postId, commentData)
            .then((commentResponse) => {
                if (commentResponse.status === 200) {
                    dispatch(commentActions.addComment({
                        postId,
                        comment: {
                            ...commentData,
                            id: commentIndex,
                        },
                    }));
                } else {
                    dispatch(commentActions.commentError(commentResponse.statusText));
                }
            })
            .catch((error) => {
                dispatch(commentActions.commentError(error.message));
            })
            .finally(() => {
                dispatch(applicationActions.removeApiCallStatus(`SaveComment${commentIndex}`));
            });
    };
};

export const patchComment = (postId, commentId, commentData) => {
    return (dispatch) => {
        const apiCalls = new ApiCalls();

        dispatch(applicationActions.addApiCallStatus(
            { callerId: `SaveComment${commentId}`, isComponent: false }
        ));
        apiCalls.apiPatchComment(postId, commentId, commentData)
            .then((commentResponse) => {
                if (commentResponse.status === 200) {
                    dispatch(commentActions.patchPost({
                        postId,
                        comment: {
                            ...commentData,
                            id: commentId,
                        },
                    }));
                } else {
                    dispatch(commentActions.commentError(commentResponse.statusText));
                }
            })
            .catch((error) => {
                dispatch(commentActions.commentError(error.message));
            })
            .finally(() => {
                dispatch(applicationActions.removeApiCallStatus(`SaveComment${commentId}`));
            });
    };
};

export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
        const apiCalls = new ApiCalls();

        dispatch(applicationActions.addApiCallStatus(
            { callerId: `DeleteComment${commentId}`, isComponent: false }
        ));
        apiCalls.apiDeleteComment(postId, commentId)
            .then((commentResponse) => {
                if (commentResponse.status === 200) {
                    dispatch(commentActions.deleteComment({
                        postId,
                        comment: {
                            id: commentId,
                        },
                    }));
                } else {
                    dispatch(commentActions.commentError(commentResponse.statusText));
                }
            })
            .catch((error) => {
                dispatch(commentActions.commentError(error.message));
            })
            .finally(() => {
                dispatch(applicationActions.removeApiCallStatus(`DeleteComment${commentId}`));
            });
    };
};

export const clearComment = () => {
    return (dispatch) => {
        dispatch(commentActions.clearComment());
    };
};
