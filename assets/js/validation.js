window.validateRequired = (form) => {
  return [...form.querySelectorAll("[required]")].every((field) => {
    return field.value.trim();
  });
};
