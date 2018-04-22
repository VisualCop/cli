import * as glob from "glob";

import { getConfig } from "./config";

async function start() {
  const config = getConfig(process.env, process.argv);

  const files = glob.sync(config.fileGlob, {
    absolute: true,
  });

  console.log(files);
}

start().catch(e => {
  console.log("ERROR: " + e);
  process.exit(1);
});
