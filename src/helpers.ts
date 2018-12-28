import ignore from "ignore";

export const match = (pattern: string, path: string) => {
  return ignore()
    .add(pattern)
    .ignores(path);
};
