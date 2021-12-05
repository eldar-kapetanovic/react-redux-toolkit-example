import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import useFormHelper from "../../helpers/useFormHelper";
import FormValidationFunctions from "../../helpers/formValidationFunctions";
import ActionButton from "../../primitives/action-button/actionButton.jsx";
import TextFieldFormWrapper from "../../primitives/textFieldFormWrapper/textFieldFormWrapper.jsx";
import { setModalData } from "../../store/actions/applicationActions";
import {
    addComment,
    clearComment,
    deleteComment,
    patchComment,
} from "../../store/actions/commentActions";
import MODAL_TYPES from "../../modals/modalTypes";
import "./edit-comment.css";
import COMMENT_ACTION_TYPES from "../../store/actionTypes/commentActionTypes";

const EditComment = forwardRef(({ postId, commentIndex, commentData, onDeleteComment }, ref) => {
    const [comment, setComment] = useState(commentData);
    const { apiCallStatus, commentId, commentAction } = useSelector((state) => ({
        apiCallStatus: state.application.apiCallStatus,
        commentId: state.comment.data?.id,
        commentAction: state.comment.action,
    }));
    const dispatch = useDispatch();
    const formHelper = useFormHelper();

    const setFormData = (formData) => {
        formHelper.onChange("name", formData.name || "", formData.name || "");
        formHelper.onChange("body", formData.body || "", formData.body || "");
    };

    const resetFormData = () => {
        setFormData(comment);
    };

    const handleConfirmDeleteComment = () => {
        if (comment.id) {
            dispatch(deleteComment(postId, comment.id));
        } else {
            onDeleteComment();
        }
    };

    const handleDeleteComment = () => {
        const modalData = {
            type: MODAL_TYPES.CONFIRM_DIALOG,
            visible: true,
            title: "Confirm comment delete.",
            description: () => (
                <>Are you really want to delete <b>&quot;{ comment.name }&quot;</b> comment?</>
            ),
            confirmActionName: `DeleteComment${comment.id || commentIndex}`,
            confirmAction: handleConfirmDeleteComment,
        };

        modalData.description.displayName = "DeleteCommentDescription";
        dispatch(setModalData(modalData));
    };

    const validateCommentData = () => formHelper.validateFormData();

    const handleSaveComment = () => {
        if (!formHelper.hasChanges()) {
            return;
        }

        if (!validateCommentData()) {
            toast.error("Please fix errors.");
            return;
        }

        const commentFormData = JSON.parse(JSON.stringify(formHelper.getFormData()));
        const newCommentData = { ...comment, ...commentFormData };

        setFormData(newCommentData);
        setComment(newCommentData);

        if (!comment.id) {
            commentFormData.timestamp = {
                ".sv":"timestamp",
            };
            dispatch(addComment(postId, commentIndex, commentFormData));
        } else {
            dispatch(patchComment(postId, comment.id, commentFormData));
        }
    };

    useImperativeHandle(ref, () => ({
        validateComment: validateCommentData,
        saveComment: handleSaveComment,
    }));

    useEffect(() => {
        if (commentId === (comment.id || commentIndex)) {
            if (commentAction === COMMENT_ACTION_TYPES.DELETE) {
                dispatch(clearComment());
                onDeleteComment();
            } else if ([COMMENT_ACTION_TYPES.POST, COMMENT_ACTION_TYPES.PATCH]
                .includes(commentAction)
            ) {
                dispatch(clearComment());
                toast.success("Comment successfully saved.");
            } else if (commentAction === COMMENT_ACTION_TYPES.ERROR) {
                dispatch(clearComment());
                toast.error("Error occurred when saving Comment data.");
            }
        }
    }, [comment.id, commentAction, commentId, commentIndex, onDeleteComment, dispatch]);

    return (postId &&
        <Card className="edit-post-card edit-post-comments">
            <CardContent>
                <div className="edit-post-form-line">
                    <TextFieldFormWrapper
                        label="Title"
                        initialData={ comment }
                        disabled={ apiCallStatus.ongoing }
                        elementName="name"
                        validatorFunctions={ [FormValidationFunctions.getRequiredValidator()] }
                        formHelper={ formHelper }
                    />
                </div>
                <div className="edit-post-form-line">
                    <TextFieldFormWrapper
                        label="Comment"
                        initialData={ comment }
                        multiline
                        disabled={ apiCallStatus.ongoing }
                        elementName="body"
                        validatorFunctions={ [FormValidationFunctions.getRequiredValidator()] }
                        formHelper={ formHelper }
                    />
                </div>
            </CardContent>
            <CardActions className="post-commands">
                <ActionButton
                    actionName={ `DeleteComment${comment.id || commentIndex}` }
                    text="DELETE"
                    color="secondary"
                    onClick={ handleDeleteComment }
                />
                <ActionButton
                    text="CANCEL"
                    color="default"
                    disabled={ !formHelper.hasChanges() }
                    onClick={ resetFormData }
                />
                <ActionButton
                    actionName={ `SaveComment${comment.id || commentIndex}` }
                    text="SAVE"
                    disabled={ !formHelper.hasChanges() }
                    onClick={ handleSaveComment }
                />
            </CardActions>
        </Card>
    );
});

EditComment.propTypes = {
    postId: PropTypes.string.isRequired,
    commentIndex: PropTypes.number.isRequired,
    commentData: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func.isRequired,
};

EditComment.displayName = "EditComment";

export default EditComment;
