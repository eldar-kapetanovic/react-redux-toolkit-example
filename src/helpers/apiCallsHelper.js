import { getAuth } from "firebase/auth";

class ApiCallsHelper {
    createAuthenticatedApiCall(apiCall) {
        const currentUser = getAuth().currentUser;

        if (currentUser) {
            return new Promise((resolve, reject) => {
                currentUser.getIdToken()
                    .then(apiCall)
                    .then(resolve)
                    .catch(reject);
            });
        }

        return new Promise((resolve, reject) => {
            reject(new Error("Unauthorized access!"));
        });
    }

    addApiCallToStatus(apiCallStatus, newApiCall, initialApiCallStatus) {
        if (!(newApiCall &&
            typeof newApiCall.callerId === "string" &&
            typeof newApiCall.isComponent === "boolean"
        )) {
            return apiCallStatus || initialApiCallStatus;
        }

        const newApiCallStatus = JSON.parse(JSON.stringify({
            ...initialApiCallStatus,
            ...apiCallStatus,
            ongoing: true,
        }));

        newApiCallStatus.calls
            .push({ callerId: newApiCall.callerId, isComponent: newApiCall.isComponent });

        return newApiCallStatus;
    }

    removeApiCallFromStatus(apiCallStatus, callerId, initialApiCallStatus) {
        if (typeof callerId !== "string") {
            return apiCallStatus || initialApiCallStatus;
        }

        const newApiCallStatus = JSON.parse(JSON.stringify({
            ...initialApiCallStatus,
            ...apiCallStatus,
        }));
        const callIndex = newApiCallStatus.calls.findIndex(
            (call) => call.callerId === callerId
        );

        if (callIndex < 0) {
            return newApiCallStatus;
        }

        newApiCallStatus.calls.splice(callIndex, 1);

        if (newApiCallStatus.calls.length === 0) {
            newApiCallStatus.ongoing = false;
        }

        return newApiCallStatus;
    }
}

export default new ApiCallsHelper();
