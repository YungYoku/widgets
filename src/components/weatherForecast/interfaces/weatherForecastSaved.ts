export const isLSSaved = (lsSaved: unknown): lsSaved is Array<string> => {
  if (!lsSaved) {
    return false;
  }

  if (!Array.isArray(lsSaved)) {
    return false;
  }

  lsSaved.forEach(item => {
    if (typeof item !== "string") {
      return false;
    }
  });

  return true;
};