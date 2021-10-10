import React from "react";
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import GuardedRoute from "./guardedRoute";
import withTopBarLayout from "../layouts/withTopBarLayout";
import Posts from "../components/posts/posts";
import PostDetails from "../components/post-details/postDetails.jsx";
import EditPost from "../components/edit-post/edit-post.jsx";

const Routes = () => (
    <Router>
        <Switch>
            <Route
                exact
                path="/posts"
                render={ props => withTopBarLayout(<Posts { ...props } />) }
            />
            <Route
                exact
                path="/post-details/:postId"
                render={ props => withTopBarLayout(<PostDetails { ...props } />) }
            />
            <GuardedRoute
                exact
                path="/edit-post/:postId"
                render={ props => withTopBarLayout(<EditPost { ...props } />) }
            />
            <GuardedRoute
                exact
                path="/add-post"
                render={ props => withTopBarLayout(<EditPost { ...props } />) }
            />
            <Redirect exact from="/*" to="/posts" />
        </Switch>
    </Router>
);

export default Routes;
