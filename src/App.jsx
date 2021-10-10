import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    getDatabase,
    limitToFirst,
    onValue,
    orderByChild,
    query,
    ref,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./router/routes";
import ResponseDataParser from "./helpers/responseDataParser";
import {
    setAuthenticated,
    setPosts,
    setReady,
} from "./store/actions/applicationActions";
import "./App.css";

const App = () => {
    const { isReady } = useSelector((state) => ({
        isReady: state.application.isReady,
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        initializeApp({
            apiKey: "AIzaSyBnWUzCReEth6a78WBTAHkfVMvUDnHmwFA",
            authDomain: "posts-249e3.firebaseapp.com",
            databaseURL: "https://posts-249e3.firebaseio.com",
            storageBucket: "bucket.appspot.com",
        });
        onAuthStateChanged(
            getAuth(),
            (user) => {
                setReady(dispatch, true);
                if (user) {
                    user.getIdToken()
                        .then(token => setAuthenticated(dispatch, (token || "") !== ""))
                        .catch(() => setAuthenticated(dispatch, false));
                } else {
                    setAuthenticated(dispatch, false);
                }
            }
        );

        const postsDataReference = query(
            ref(getDatabase(), "posts/"),
            orderByChild("timestamp"),
            limitToFirst(100)
        );

        onValue(postsDataReference, (snapshot) => {
            setPosts(dispatch, ResponseDataParser.getPostsFromData(snapshot.val()));
        });
    }, [dispatch]);

    return isReady === true
        ? (
            <Routes />
        )
        : null;
};

const Application = () => (
    <>
        <App />
        <ToastContainer
            autoClose={ 3000 }
            hideProgressBar={ true }
            newestOnTop={ true }
            theme="colored"
            transition={ Slide }
        />
    </>
);

export default Application;
