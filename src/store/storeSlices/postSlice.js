import { createSlice } from "@reduxjs/toolkit";

import POST_ACTION_TYPES from "../actionTypes/postActionTypes";

const initialState = {
    data: null,
    action: POST_ACTION_TYPES.CLEAR,
    error: null,
};

const updateState = (state, newData) => {
    state.data = newData.data;
    state.action = newData.action;
    state.error = newData.error;
};

const updatePostData = (postData, newData) => {
    const postDataClone = JSON.parse(JSON.stringify(postData));
    const newDataClone = JSON.parse(JSON.stringify(newData));

    return { ...postDataClone, ...newDataClone };
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getPost(state, action) {
            updateState(
                state,
                {
                    data: action.payload,
                    action: POST_ACTION_TYPES.GET,
                    error: null,
                }
            );
        },
        postPost(state, action) {
            updateState(
                state,
                {
                    data: action.payload,
                    action: POST_ACTION_TYPES.POST,
                    error: null,
                }
            );
        },
        patchPost(state, action) {
            updateState(
                state,
                {
                    data: updatePostData(state.data, action.payload),
                    action: POST_ACTION_TYPES.PATCH,
                    error: null,
                }
            );
        },
        deletePost(state) {
            updateState(
                state,
                {
                    data: null,
                    action: POST_ACTION_TYPES.DELETE,
                    error: null,
                }
            );
        },
        clearPost(state) {
            updateState(
                state,
                {
                    data: null,
                    action: POST_ACTION_TYPES.CLEAR,
                    error: null,
                }
            );
        },
        postError(state, action) {
            updateState(
                state,
                {
                    data: null,
                    action: POST_ACTION_TYPES.ERROR,
                    error: {
                        error: action.payload,
                    },
                }
            );
        },
    },
});

export const postActions = postSlice.actions;

export default postSlice;
