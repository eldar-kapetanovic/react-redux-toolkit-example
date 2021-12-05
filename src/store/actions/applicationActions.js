import { applicationActions } from "../storeSlices/applicationSlice";

export const setReady = (isReady) => {
    return (dispatch) => {
        dispatch(applicationActions.setReady(isReady));
    };
};

export const setAuthenticated = (isAuthenticated) => {
    return (dispatch) => {
        dispatch(applicationActions.setAuthenticated(isAuthenticated));
    };
};

export const setApplicationTitle = (applicationTitle) => {
    return (dispatch) => {
        dispatch(applicationActions.setApplicationTitle(applicationTitle));
    };
};

export const setShowExport = (isShowExport) => {
    return (dispatch) => {
        dispatch(applicationActions.setShowExport(isShowExport));
    };
};

export const setPosts = (posts) => {
    return (dispatch) => {
        dispatch(applicationActions.setPosts(posts));
    };
};

export const setModalData = (modalData) => {
    return (dispatch) => {
        dispatch(applicationActions.setModalData(modalData));
    };
};

export const addApiCallStatus = (apiCallStatus) => {
    return (dispatch) => {
        dispatch(applicationActions.addApiCallStatus(apiCallStatus));
    };
};

export const removeApiCallStatus = (apiCallId) => {
    return (dispatch) => {
        dispatch(applicationActions.removeApiCallStatus(apiCallId));
    };
};
