import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

import "./componentLoader.css";

const ComponentLoader = () => {
    const [loading, setLoading] = useState(false);
    const { apiCallStatus } = useSelector((state) => ({
        apiCallStatus: state.application.apiCallStatus,
    }));

    useEffect(() => {
        if (apiCallStatus.ongoing && apiCallStatus.calls.some((call) => call.isComponent)) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [apiCallStatus]);

    return (
        <Fade
            in={ loading }
            style={ {
                transitionDelay: loading ? "300ms" : "250ms",
            } }
            unmountOnExit
        >
            <div className="component-loader">
                <CircularProgress />
            </div>
        </Fade>
    );
};

export default ComponentLoader;
