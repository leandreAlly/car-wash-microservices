export const checkEnvVar = (varName: string) => {
  if (!process.env[varName]) {
    throw new Error(`${varName} must be defined`);
  }
};
