import { applicationActions } from "../storeSlices/applicationSlice";

export const setReady = (dispatch, isReady) => {
    dispatch(applicationActions.setReady(isReady));
};

export const setAuthenticated = (dispatch, isAuthenticated) => {
    dispatch(applicationActions.setAuthenticated(isAuthenticated));
};

export const setApplicationTitle = (dispatch, applicationTitle) => {
    dispatch(applicationActions.setApplicationTitle(applicationTitle));
};

export const setShowExport = (dispatch, isShowExport) => {
    dispatch(applicationActions.setShowExport(isShowExport));
};

export const setPosts = (dispatch, posts) => {
    dispatch(applicationActions.setPosts(posts));
};

export const setModalData = (dispatch, modalData) => {
    dispatch(applicationActions.setModalData(modalData));
};

export const addApiCallStatus = (dispatch, apiCallStatus) => {
    dispatch(applicationActions.addApiCallStatus(apiCallStatus));
};

export const removeApiCallStatus = (dispatch, apiCallId) => {
    dispatch(applicationActions.removeApiCallStatus(apiCallId));
};
