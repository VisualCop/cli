import * as crypto from "crypto";

export const shaCalc = () => (binaryFileString: Buffer): string => {
  const hashFunction = crypto.createHash("sha256");

  hashFunction.update(binaryFileString);

  return hashFunction.digest("hex");
};
