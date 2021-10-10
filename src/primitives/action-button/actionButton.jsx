import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const ActionButton = ({ actionName, text, variant, color, disabled, onClick }) => {
    const { apiCallStatus } = useSelector((state) => ({
        apiCallStatus: state.application.apiCallStatus,
    }));

    return (
        <Button
            variant={ variant }
            color={ color }
            disabled={ disabled || apiCallStatus.ongoing }
            onClick={ onClick }
        >
            { actionName && apiCallStatus.calls.some((call) => call.callerId === actionName) && (
                <CircularProgress size={ 24 } color="inherit" className="app-button-progress" />) }
            { text }
        </Button>
    );
};

ActionButton.propTypes = {
    actionName: PropTypes.string,
    text: PropTypes.string.isRequired,
    variant: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

ActionButton.defaultProps = {
    actionName: null,
    variant: "outlined",
    color: "primary",
    disabled: false,
    onClick: () => {},
};

export default ActionButton;
