import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";

import NavigationLink from "../../primitives/navigation-link/navigationLink";
import ActionButton from "../../primitives/action-button/actionButton";
import "./topBar.css";
import { setModalData } from "../../store/actions/applicationActions";
import MODAL_TYPES from "../../modals/modalTypes";

const TopBar = () => {
    const {
        authenticated,
        showExport,
        applicationTitle,
        posts,
    } = useSelector((state) => (
        {
            authenticated: state.application.authenticated,
            showExport: state.application.showExport,
            applicationTitle: state.application.applicationTitle,
            posts: state.application.posts,
        }
    ));
    const dispatch = useDispatch();

    const handleAuthenticationModal = () => {
        if (authenticated) {
            setModalData(dispatch, { type: MODAL_TYPES.LOGOUT, visible: true });

            return;
        }

        setModalData(dispatch, { type: MODAL_TYPES.LOGIN, visible: true });
    };
    
    return (
        <AppBar position="static" color="default">
            <Container fixed>
                <Toolbar>
                    <div className="app-header-logo-title">
                        <NavigationLink
                            className="app-header-logo-link"
                            to="/posts"
                        >
                            <img
                                alt="home"
                                src="/posts76-icon.png"
                                className="app-header-logo"
                            />
                        </NavigationLink>
                        <span>
                            { applicationTitle }
                        </span>
                    </div>
                    <div className="button-group">
                        { authenticated && showExport && (
                            <ActionButton
                                text="EXPORT TO JSON"
                                disabled={ (posts || []).length === 0 }
                            />
                        ) }
                        { authenticated && (
                            <NavigationLink
                                className="button-link"
                                to="/add-post"
                            >
                                <ActionButton
                                    text="ADD POST"
                                    variant="outlined"
                                    color="primary"
                                />
                            </NavigationLink>
                        ) }
                        <ActionButton
                            text={ `${authenticated ? "LOGOUT" : "LOGIN"}` }
                            onClick={ handleAuthenticationModal }
                        />
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default TopBar;
