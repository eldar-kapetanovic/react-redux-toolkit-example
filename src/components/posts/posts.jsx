import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setApplicationTitle, setShowExport } from "../../store/actions/applicationActions";
import Post from "../post/post";
import "./posts.css";

const Posts = () => {
    const { posts } = useSelector((state) => ({
        posts: state.application.posts,
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setApplicationTitle("Posts List"));
        dispatch(setShowExport(true));

        return () => dispatch(setShowExport(false));
    }, [dispatch]);

    return (
        <div className="posts-grid">
            { posts.map((post) => Boolean(post) && <Post key={ post.id } post={ post } />) }
        </div>
    );
};

export default Posts;
