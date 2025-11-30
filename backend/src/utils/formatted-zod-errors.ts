import { ZodError } from 'zod';

export const formattedZodErrors = (errors: ZodError) => {
  const formattedErrors: Record<string, string[]> = {};

  errors.issues.forEach(({ path, message }) => {
    const key = path.join('.');

    if (!formattedErrors[key]) {
      formattedErrors[key] = [];
    }

    formattedErrors[key].push(message);
  });

  return formattedErrors;
};
