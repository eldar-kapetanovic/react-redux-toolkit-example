function copyFunctionsToObject(destinationObject, sourceObject) {
    Object.keys(sourceObject).forEach((key) => {
        if (sourceObject[key] &&
            typeof sourceObject[key] === "object" &&
            !Array.isArray(sourceObject[key]) &&
            Boolean(destinationObject[key])
        ) {
            copyFunctionsToObject(destinationObject[key], sourceObject[key]);
        } else if (typeof sourceObject[key] === "function") {
            destinationObject[key] = sourceObject[key];
        }
    });
}

export const updateObject = (object, newValues) => {
    const clonedObject = JSON.parse(JSON.stringify(object || {}));
    const preparedNewValues = JSON.parse(JSON.stringify(newValues || {}));

    Object.entries(preparedNewValues).forEach(([key, value]) => {
        clonedObject[key] = value;
    });

    copyFunctionsToObject(clonedObject, object);

    copyFunctionsToObject(clonedObject, newValues);

    return clonedObject;
};
