import { createSlice } from "@reduxjs/toolkit";

import ApiCallsHelper from "../../helpers/apiCallsHelper";
import MODAL_TYPES from "../../modals/modalTypes";

const initialState = {
    isReady: false,
    authenticated: false,
    applicationTitle: "Posts List",
    showExport: false,
    posts: [],
    modalData: { type: MODAL_TYPES.NONE, visible: false },
    apiCallStatus: { ongoing: false, calls: [] },
};

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        setReady(state, action) {
            state.isReady = action.payload;
        },
        setAuthenticated(state, action) {
            state.authenticated = action.payload;
        },
        setApplicationTitle(state, action) {
            state.applicationTitle = action.payload;
        },
        setShowExport(state, action) {
            state.showExport = action.payload;
        },
        setPosts(state, action) {
            state.posts = action.payload;
        },
        setModalData(state, action) {
            state.modalData = action.payload;
        },
        addApiCallStatus(state, action) {
            state.apiCallStatus = ApiCallsHelper.addApiCallToStatus(
                state.apiCallStatus,
                action.payload,
                initialState.apiCallStatus
            );
        },
        removeApiCallStatus(state, action) {
            state.apiCallStatus = ApiCallsHelper.removeApiCallFromStatus(
                state.apiCallStatus,
                action.payload,
                initialState.apiCallStatus
            );
        },
    },
});

export const applicationActions = applicationSlice.actions;

export default applicationSlice;
