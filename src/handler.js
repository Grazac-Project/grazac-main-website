export const inputChangeHandler = (
  event,
  elementID,
  formType,
  updateFunction,
  setFormValid,
) => {
  let isValid = true;
  for (let validation of formType[elementID].validations) {
    isValid = validation(event.target.value).isTrue && isValid;
  }
  const updatedFormElement = {
    ...formType[elementID],
    value: event.target.value,
    isValid: isValid,
  };
  const updatedForm = {
    ...formType,
    [elementID]: updatedFormElement,
  };

  setFormValid();
  return updateFunction(updatedForm);
};

export const handleBlur = (elementID, formType, updateFunction) => {
  const updatedFormElement = {
    ...formType[elementID],
    blur: true,
  };

  const updatedForm = {
    ...formType,
    [elementID]: updatedFormElement,
  };

  return updateFunction(updatedForm);
};
