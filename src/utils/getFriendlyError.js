// src/utils/getFriendlyError.js
export const getFriendlyError = (code, t) => {
  const errorKey = `errors.${code}`;
  const fallback = t("errors.default", "Something went wrong. Please try again.");
  return t(errorKey, fallback);
};
