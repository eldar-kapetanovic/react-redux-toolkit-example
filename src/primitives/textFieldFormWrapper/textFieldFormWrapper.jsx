import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

const TextFieldFormWrapper = ({
    label,
    multiline,
    initialData,
    disabled,
    elementName,
    validatorFunctions,
    formHelper,
    onChange,
}) => {
    const [initialized, setInitialized] = useState(false);
    const initialValue = (initialData || {})[elementName] || "";
    const { onChange: onChangeFormValue, setElementValidatorFunctions } = formHelper;

    useEffect(() => {
        if (elementName && !initialized) {
            setInitialized(true);
            setElementValidatorFunctions?.(elementName, validatorFunctions);
            onChangeFormValue?.(elementName, initialValue, initialValue);
        }
    }, [
        initialized,
        elementName,
        setElementValidatorFunctions,
        onChangeFormValue,
        validatorFunctions,
        initialValue,
    ]);

    useEffect(() => {
        setElementValidatorFunctions?.(elementName, validatorFunctions);
    }, [elementName, validatorFunctions, setElementValidatorFunctions]);

    const onValueChange = (formElementName, value) => {
        formHelper.onChange(formElementName, value, initialValue);

        if (typeof onChange === "function") {
            onChange(value);
        }
    };


    return formHelper.formData.data[elementName] != null
        ? (
            <TextField
                label={ label }
                multiline={ multiline }
                value={ formHelper.formData.data[elementName] }
                disabled={ disabled }
                helperText={ formHelper.formData.errors[elementName] }
                error={ Boolean(formHelper.formData.errors[elementName]) }
                onChange={ (event) => onValueChange(elementName, event.target.value) }
            />
        )
        : null;
};

TextFieldFormWrapper.propTypes = {
    label: PropTypes.string,
    multiline: PropTypes.bool,
    initialData: PropTypes.object,
    disabled: PropTypes.bool,
    elementName: PropTypes.string.isRequired,
    validatorFunctions: PropTypes.array,
    formHelper: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

TextFieldFormWrapper.defaultProps = {
    label: "",
    multiline: false,
    initialData: null,
    disabled: false,
    validatorFunctions: null,
    onChange: null,
};

export default TextFieldFormWrapper;
