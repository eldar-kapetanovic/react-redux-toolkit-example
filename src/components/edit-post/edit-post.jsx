import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import useFormHelper from "../../helpers/useFormHelper";
import FormValidationFunctions from "../../helpers/formValidationFunctions";
import TextFieldFormWrapper from "../../primitives/textFieldFormWrapper/textFieldFormWrapper.jsx";
import ActionButton from "../../primitives/action-button/actionButton.jsx";
import EditComment from "../edit-comment/edit-comment";
import {
    setApplicationTitle,
    setModalData,
} from "../../store/actions/applicationActions";
import {
    addPost,
    clearPost,
    getPost,
    patchPost,
} from "../../store/actions/postActions";
import { clearComment } from "../../store/actions/commentActions";
import MODAL_TYPES from "../../modals/modalTypes";
import POST_ACTION_TYPES from "../../store/actionTypes/postActionTypes";
import "./edit-post.css";

const EditPost = ({ match: { params: { postId } } }) => {
    const [post, setPost] = useState();
    const {
        authenticated,
        apiCallStatus,
        postData,
        postAction,
        error,
    } = useSelector((state) => (
        {
            authenticated: state.application.authenticated,
            apiCallStatus: state.application.apiCallStatus,
            postData: state.post.data,
            postAction: state.post.action,
            error: state.post.error,
        }
    ));
    const dispatch = useDispatch();
    const formHelper = useFormHelper();
    const { onChange: changeFormValue } = formHelper;
    const commentsRef = useRef([]);
    const history = useHistory();

    const setFormData = useCallback((newPostData) => {
        if (newPostData) {
            changeFormValue("title", newPostData.title || "", newPostData.title || "");
            changeFormValue("body", newPostData.body || "", newPostData.body || "");
        }
    }, [changeFormValue]);

    const resetFormData = useCallback(() => {
        setFormData(post);
    }, [post, setFormData]);

    useEffect(() => {
        if (postId) {
            dispatch(setApplicationTitle("Edit Post"));
            dispatch(getPost(postId));
        } else {
            dispatch(setApplicationTitle("Add Post"));
            dispatch(clearPost());
            dispatch(clearComment());
        }

        return () => {
            dispatch(clearPost());
            dispatch(clearComment());
        };
    }, [postId, dispatch]);

    useEffect(() => {
        if (postAction === POST_ACTION_TYPES.GET) {
            setPost({
                title: postData.title,
                body: postData.body,
                comments: postData.comments,
            });
        } else if (postAction === POST_ACTION_TYPES.POST && !postId) {
            toast.success("New Post created successfully.");
            history.push(`/edit-post/${postData.id}`);
        } else if (postAction === POST_ACTION_TYPES.PATCH) {
            toast.success("Post saved successfully.");
        } else if (postAction === POST_ACTION_TYPES.CLEAR) {
            setPost({
                title: "",
                body: "",
                comments: [],
            });
            commentsRef.current = [];
        } else if (postAction === POST_ACTION_TYPES.ERROR) {
            toast.error("Error occurred when saving Post data.");
        }
    }, [postId, postData, postAction, dispatch, history]);

    useEffect(() => {
        resetFormData();
    }, [post, resetFormData]);

    const handleAddNewComment = () => {
        const postCopy = JSON.parse(JSON.stringify(post));

        if (postCopy.comments) {
            postCopy.comments.push({ name: "", body: "" });
        } else {
            postCopy.comments = [{ name: "", body: "" }];
        }

        setPost(postCopy);
    };

    const handleDeletePost = () => {
        dispatch(setModalData(
            {
                type: MODAL_TYPES.DELETE_POST,
                visible: true,
                postTitle: post.title,
                postId,
            }
        ));
    };

    const handleSavePost = () => {
        const postValid = formHelper.validateFormData();
        const commentsValid = commentsRef.current.every((commentReference) => (
            commentReference.validateComment()
        ));

        if (!postValid || !commentsValid) {
            toast.error("Please fix errors.");
            return;
        }

        const newPostData = JSON.parse(JSON.stringify(formHelper.getFormData()));

        setPost({
            ...post,
            ...newPostData,
        });

        if (postId == null) {
            newPostData.timestamp = {
                ".sv":"timestamp",
            };
            dispatch(addPost(newPostData));
        } else {
            commentsRef.current.forEach((commentReference) => {
                commentReference.saveComment();
            });
            dispatch(patchPost(postId, newPostData));
        }
    };

    const deleteComment = (commentIndex) => {
        const postCopy = JSON.parse(JSON.stringify(post));

        postCopy.comments.splice(commentIndex, 1);
        commentsRef.current.splice(commentIndex, 1);
        setPost(postCopy);

        toast.success("Comment deleted successfully.");
    };

    const handleDeleteComment = (commentIndex) => {
        deleteComment(commentIndex);
    };

    return (post && authenticated && !error && (
        <>
            <Card className="edit-post-card">
                <CardHeader className="width-100" title="Post" />
                <CardContent className="edit-post-content">
                    <div className="edit-post-form-line">
                        <TextFieldFormWrapper
                            label="Title"
                            initialData={ post }
                            disabled={ apiCallStatus.ongoing }
                            elementName="title"
                            validatorFunctions={ [FormValidationFunctions.getRequiredValidator()] }
                            formHelper={ formHelper }
                        />
                    </div>
                    <div className="edit-post-form-line">
                        <TextFieldFormWrapper
                            label="Post"
                            multiline
                            initialData={ post }
                            disabled={ apiCallStatus.ongoing }
                            elementName="body"
                            validatorFunctions={ [FormValidationFunctions.getRequiredValidator()] }
                            formHelper={ formHelper }
                        />
                    </div>
                </CardContent>
                <CardActions className="post-commands">
                    <ActionButton
                        actionName={ `deletePost${postId}` }
                        text="DELETE"
                        color="secondary"
                        disabled={ postId == null }
                        onClick={ handleDeletePost }
                    />
                    <ActionButton
                        text="CANCEL"
                        color="default"
                        disabled={ !formHelper.hasChanges() }
                        onClick={ resetFormData }
                    />
                    <ActionButton
                        actionName="SavePost"
                        text="SAVE"
                        disabled={ !formHelper.hasChanges() }
                        onClick={ handleSavePost }
                    />
                </CardActions>
            </Card>
            { <Card className="edit-post-card">
                <CardHeader
                    title="Comments" 
                    action={ (
                        <IconButton
                            aria-label="add"
                            disabled={ postId == null }
                            onClick={ handleAddNewComment }
                        >
                            <Icon
                                color={ (postId == null) ? "disabled" : "primary" }
                            >
                                add_circle
                            </Icon>
                        </IconButton>
                    ) }
                />
                <CardContent>
                    { postId && post.comments && post.comments.map((comment, index) => (
                        <EditComment
                            ref={ el => { commentsRef.current[index] = el; } }
                            key={ comment.id || `editComment${index}` }
                            postId={ postId }
                            commentIndex={ index }
                            commentData={ comment }
                            onDeleteComment={ handleDeleteComment.bind(this, index) }
                        />
                    )) }
                </CardContent>
            </Card> }
        </>)
    ) || null;
};

EditPost.propTypes = {
    match: PropTypes.object.isRequired,
};

export default EditPost;
