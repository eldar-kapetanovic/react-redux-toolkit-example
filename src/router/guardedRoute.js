import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const GuardedRoute = ({ path, ...props }) => {
    const { authenticated } = useSelector((state) => ({
        authenticated: state.application.authenticated,
    }));

    return (authenticated ?
        <Route path={ path } { ...props } /> :
        <Redirect exact from={ path } to={ "/posts" } />
    );
};

GuardedRoute.propTypes = {
    path: PropTypes.string.isRequired,
};

export default GuardedRoute;
