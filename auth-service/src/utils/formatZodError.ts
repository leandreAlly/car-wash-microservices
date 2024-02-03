import { ZodError, ZodIssue } from 'zod';

const formatZodIssue = (issue: ZodIssue): { path: string; message: string } => {
  const path = issue.path.join('.');
  const message = issue.message;

  return { path, message };
};

// Format the Zod error message with only the current error
export const formatZodError = (
  error: ZodError
): { path: string; message: string } | undefined => {
  const { issues } = error;

  if (issues.length) {
    const currentIssue = issues[0];
    return formatZodIssue(currentIssue);
  }
};
