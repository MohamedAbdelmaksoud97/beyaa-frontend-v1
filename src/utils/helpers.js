export function handleValidationErrors(form, error, field) {
  console.log("Handling validation errors:", field, error);
  const fieldType = error?.data?.error?.keyPattern?.[field];
  console.log("Field type:", fieldType);
  if (fieldType) {
    form.setError(field, {
      type: "server",
      message: `${field} already exists. Please use another one.`,
    });
    return;
  }
}
