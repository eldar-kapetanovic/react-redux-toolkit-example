import { configureStore } from "@reduxjs/toolkit";

import applicationSlice from "./storeSlices/applicationSlice";
import postSlice from "./storeSlices/postSlice";
import commentSlice from "./storeSlices/commentSlice";

const store = configureStore({
    reducer: {
        application: applicationSlice.reducer,
        post: postSlice.reducer,
        comment: commentSlice.reducer,
    },
});

export default store;
