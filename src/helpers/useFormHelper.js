import {
    useCallback, useEffect, useState, 
} from "react";

let validatorFunctions = {};

const useFormHelper = () => {
    const [formData, setFormData] = useState({ data: {}, errors: {}, changes: {} });

    useEffect(() => () => {
        validatorFunctions = {};
    });

    const setElementValidatorFunctions = useCallback((elementName, elementValidatorFunctions) => {
        if (Array.isArray(elementValidatorFunctions)) {
            validatorFunctions[elementName] = elementValidatorFunctions;
        }
    }, []);

    const onChange = useCallback((elementName, value, initialValue) => {
        setFormData((oldData) => ({
            data: { ...oldData.data, [elementName]: value },
            errors: { ...oldData.errors, [elementName]: "" },
            changes: { ...oldData.changes, [elementName]: value !== initialValue },
        }));
    }, []);

    const hasChanges = useCallback(() => (
        Object.values(formData.changes).some((value) => value)
    ), [formData.changes]);

    const getFormData = useCallback(() => ({
        ...formData.data,
    }), [formData.data]);

    const getElementValue = useCallback(
        (elementName) => formData.data[elementName],
        [formData.data]
    );

    const validateFormData = useCallback(() => {
        let formValid = true;

        Object.keys(formData.data).forEach((elementName) => {
            if (Array.isArray(validatorFunctions[elementName])) {
                let errorMessage;

                for (const validationFunction of validatorFunctions[elementName]) {
                    if (typeof validationFunction === "function") {
                        const validationMessage = validationFunction(formData.data[elementName]);

                        if (validationMessage && typeof validationMessage === "string") {
                            errorMessage = validationMessage;
                            break;
                        }
                    }
                }

                if (errorMessage) {
                    formValid = false;
                    setFormData((oldData) => ({
                        data: { ...oldData.data },
                        errors: { ...oldData.errors, [elementName]: errorMessage },
                        changes: { ...oldData.changes },
                    }));
                } else if (formData.errors[elementName] !== "") {
                    setFormData((oldData) => ({
                        data: { ...oldData.data },
                        errors: { ...oldData.errors, [elementName]: "" },
                        changes: { ...oldData.changes },
                    }));
                }
            }
        });

        return formValid;
    }, [formData.data, formData.errors]);

    return {
        formData,
        setElementValidatorFunctions,
        onChange,
        hasChanges,
        getFormData,
        getElementValue,
        validateFormData,
    };
};

export default useFormHelper;
