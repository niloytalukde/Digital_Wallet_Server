import AppError from "./errorHelper";

export const handleMongoDuplicateError = (error: any): AppError => {
  const field = Object.keys(error.keyValue)[0];
  const value = error.keyValue[field];

  const message = `${field} '${value}' already exists`;

  return new AppError (409, message);
};
