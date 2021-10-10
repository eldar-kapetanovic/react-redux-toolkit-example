import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavigationLink = ({ className, to, disabled, children}) => {
    const { apiCallStatus } = useSelector((state) => ({
        apiCallStatus: state.application.apiCallStatus,
    }));

    const linkClass = () => {
        if (disabled || apiCallStatus.ongoing) {
            return `${className} app-disabled-link`;
        }

        return `${className}`;
    };

    return (
        <Link
            className={ linkClass() }
            to={ disabled || apiCallStatus.ongoing ? "#" : to }
        >
            { children }
        </Link>
    );
};

NavigationLink.propTypes = {
    className: PropTypes.string,
    to: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.object.isRequired,
};

NavigationLink.defaultProps = {
    className: "",
    disabled : false,
};

export default NavigationLink;
