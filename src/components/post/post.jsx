import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import ActionButton from "../../primitives/action-button/actionButton";
import NavigationLink from "../../primitives/navigation-link/navigationLink";
import { setModalData } from "../../store/actions/applicationActions";
import MODAL_TYPES from "../../modals/modalTypes";
import "./post.css";

const Post = ({ post }) => {
    const { authenticated } = useSelector((state) => ({
        authenticated: state.application.authenticated,
    }));
    const dispatch = useDispatch();

    const handleDeletePost = () => {
        setModalData(
            dispatch,
            {
                type: MODAL_TYPES.DELETE_POST,
                visible: true,
                postTitle: post.title,
                postId: post.id,
            }
        );
    };

    return (
        <Card className="post-card">
            <NavigationLink className="post-navigation" to={ `/post-details/${post.id}` }>
                <CardHeader
                    avatar={
                        <Avatar
                            alt="post"
                            aria-label="post"
                            src="/posts76-icon.png"
                            className="post-header-image"
                        />
                    }
                    title={ post.title }
                    subheader={ (post.comments || []).length }
                />
            </NavigationLink>
            <CardContent className="post-content">
                <p>
                    { post.body }
                </p>
            </CardContent>
            { authenticated && (
                <CardActions className="post-commands">
                    <ActionButton
                        actionName={ `deletePost${post.id}` }
                        text="DELETE"
                        color="secondary"
                        onClick={ handleDeletePost }
                    />
                    <NavigationLink className="post-edit" to={ `/edit-post/${post.id}` }>
                        <ActionButton
                            text="EDIT"
                        />
                    </NavigationLink>
                </CardActions>
            ) }
        </Card>
    );
};

Post.propTypes = {
    post: PropTypes.object.isRequired,
};

export default Post;
