import ApiCalls from "../../services/apiCalls";
import ResponseDataParser from "../../helpers/responseDataParser";
import { applicationActions } from "../storeSlices/applicationSlice";
import { postActions } from "../storeSlices/postSlice";

export const getPost = (postId) => {
    return (dispatch) => {
        const apiCalls = new ApiCalls();

        dispatch(applicationActions.addApiCallStatus(
            { callerId: "GetPost", isComponent: true }
        ));
        apiCalls.apiPost(postId)
            .then((postResponse) => {
                if (postResponse.status === 200) {
                    dispatch(postActions.getPost(
                        ResponseDataParser.getPostFromResponse(postResponse, postId)
                    ));
                } else {
                    dispatch(postActions.postError(postResponse.statusText));
                }
            })
            .catch((error) => {
                dispatch(postActions.postError(error.message));
            })
            .finally(() => {
                dispatch(applicationActions.removeApiCallStatus("GetPost"));
            });
    };
};

export const addPost = (postData) => {
    return (dispatch) => {
        const apiCalls = new ApiCalls();

        dispatch(applicationActions.addApiCallStatus(
            { callerId: "SavePost", isComponent: false }
        ));
        apiCalls.apiAddPost(postData)
            .then((postResponse) => {
                if (postResponse.status === 200) {
                    dispatch(postActions.postPost({ ... postData, id: postResponse.data.name }));
                } else {
                    dispatch(postActions.postError(postResponse.statusText));
                }
            })
            .catch((error) => {
                dispatch(postActions.postError(error.message));
            })
            .finally(() => {
                dispatch(applicationActions.removeApiCallStatus("SavePost"));
            });
    };
};

export const patchPost = (postId, postData) => {
    return (dispatch) => {
        const apiCalls = new ApiCalls();

        dispatch(applicationActions.addApiCallStatus(
            { callerId: "SavePost", isComponent: false }
        ));
        apiCalls.apiPatchPost(postId, postData)
            .then((postResponse) => {
                if (postResponse.status === 200) {
                    dispatch(postActions.patchPost({ ... postData, id: postId }));
                } else {
                    dispatch(postActions.postError(postResponse.statusText));
                }
            })
            .catch((error) => {
                dispatch(postActions.postError(error.message));
            })
            .finally(() => {
                dispatch(applicationActions.removeApiCallStatus("SavePost"));
            });
    };
};

export const deletePost = (postId) => {
    return (dispatch) => {
        const apiCalls = new ApiCalls();

        dispatch(applicationActions.addApiCallStatus(
            { callerId: `DeletePost${postId}`, isComponent: false }
        ));
        apiCalls.apiDeletePost(postId)
            .then((postResponse) => {
                if (postResponse.status === 200) {
                    dispatch(postActions.deletePost(postId));
                } else {
                    dispatch(postActions.postError(postResponse.statusText));
                }
            })
            .catch((error) => {
                dispatch(postActions.postError(error.message));
            })
            .finally(() => {
                dispatch(applicationActions.removeApiCallStatus(`DeletePost${postId}`));
            });
    };
};

export const clearPost = () => {
    return (dispatch) => {
        dispatch(postActions.clearPost());
    };
};
