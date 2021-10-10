import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import NavigationLink from "../../primitives/navigation-link/navigationLink";
import { setApplicationTitle } from "../../store/actions/applicationActions";
import { clearPost ,getPost } from "../../store/actions/postActions";
import "./postDetails.css";
import POST_ACTION_TYPES from "../../store/actionTypes/postActionTypes";

const PostDetails = ({ match: { params: { postId } } }) => {
    const {
        authenticated,
        post,
        postAction,
        error,
    } = useSelector((state) => (
        {
            authenticated: state.application.authenticated,
            post: state.post.data,
            postAction: state.post.action,
            error: state.post.error,
        }
    ));
    const dispatch = useDispatch();

    useEffect(() => {
        setApplicationTitle(dispatch, "Post Details");
        getPost(dispatch, postId);

        return () => {
            clearPost(dispatch);
        };
    }, [dispatch, postId]);

    useEffect(() => {
        if (postAction === POST_ACTION_TYPES.ERROR) {
            toast.error("Error occurred when saving Post data.");
        }
    }, [postAction]);

    return (Boolean(post) && !error && (
        <>
            <Card className="post-details-card">
                <CardHeader
                    className="width-100"
                    action={ authenticated && (
                        <NavigationLink
                            className="post-details-edit"
                            to={ `/edit-post/${postId}` }
                        >
                            <IconButton aria-label="edit">
                                <Icon color="primary">edit</Icon>
                            </IconButton>
                        </NavigationLink>
                    ) }
                    title="Post"
                />
                <CardContent className="post-details-content">
                    <div className="post-details-table">
                        <h2>{ post.title }</h2>
                        { post.body }
                    </div>
                </CardContent>
            </Card>
            <Card className="post-details-card">
                <CardHeader title="Comments" />
                <CardContent>
                    { post.comments && post.comments.map((comment) => (
                        <Card key={ comment.id } className="post-details-card">
                            <CardHeader title={ comment.name } />
                            <CardContent className="post-details-content">
                                { comment.body }
                            </CardContent>
                        </Card>
                    )) }
                </CardContent>
            </Card>
        </>
    ) || null);
};

PostDetails.propTypes = {
    match: PropTypes.object.isRequired,
};

export default PostDetails;
