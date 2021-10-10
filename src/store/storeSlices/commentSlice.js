import { createSlice } from "@reduxjs/toolkit";

import COMMENT_ACTION_TYPES from "../actionTypes/commentActionTypes";

const initialState = {
    postId: null,
    data: null,
    action: COMMENT_ACTION_TYPES.CLEAR,
    error: null,
};

const updateState = (state, newData) => {
    state.postId = newData.postId;
    state.data = newData.data;
    state.action = newData.action;
    state.error = newData.error;
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        postComment(state, action) {
            updateState(
                state,
                {
                    postId: action.payload.postId,
                    data: action.payload.comment,
                    action: COMMENT_ACTION_TYPES.POST,
                    error: null,
                }
            );
        },
        patchPost(state, action) {
            updateState(
                state,
                {
                    postId: action.payload.postId,
                    data: action.payload.comment,
                    action: COMMENT_ACTION_TYPES.PATCH,
                    error: null,
                }
            );
        },
        deleteComment(state, action) {
            updateState(
                state,
                {
                    postId: action.payload.postId,
                    data: action.payload.comment,
                    action: COMMENT_ACTION_TYPES.DELETE,
                    error: null,
                }
            );
        },
        clearComment(state) {
            updateState(
                state,
                {
                    postId: null,
                    data: null,
                    action: COMMENT_ACTION_TYPES.CLEAR,
                    error: null,
                }
            );
        },
        commentError(state, action) {
            updateState(
                state,
                {
                    postId: null,
                    data: null,
                    action: COMMENT_ACTION_TYPES.ERROR,
                    error: {
                        error: action.payload,
                    },
                }
            );
        },
    },
});

export const commentActions = commentSlice.actions;

export default commentSlice;
