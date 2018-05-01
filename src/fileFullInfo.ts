import { basename, extname } from "path";
import { IAppContainer } from "./container";

export interface IFileFullInfo {
  name: string;
  path: string;
  buffer: Buffer;
  sha: string;
}

export const getFileFullInfo = ({ fs, shaCalc }: IAppContainer) => (path: string): IFileFullInfo => {
  const name = basename(path, extname(path));
  const buffer = fs.readFileSync(path);

  return {
    name,
    path,
    buffer,
    sha: shaCalc(buffer),
  };
};
