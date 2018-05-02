#!/usr/bin/env node

import * as glob from "glob";

import { getContainer } from "./container";

async function start(): Promise<void> {
  const { api, getFileFullInfo, config, logger } = getContainer();

  const files = glob.sync(config.fileGlob, {
    absolute: true,
  });
  logger.info("Files found: ", files.length);

  const filesFullInfo = files.map(getFileFullInfo);
  // TODO: filter files already uploaded

  logger.info("Uploading...");
  await Promise.all(filesFullInfo.map(f => api.uploadImage(f.buffer)));
  logger.info("Done");

  logger.info("Creating commit...");
  await api.createCommit(filesFullInfo.map(f => ({ imageSha: f.sha, name: f.name })));
  logger.info("Done");

  logger.info("Creating diff");
  await api.createDiff();
}

start().catch(e => {
  // tslint:disable-next-line
  console.log("ERROR: ", e);
  process.exit(1);
});
