import { constants as fsConstants, copyFileSync, rmSync } from 'node:fs';
import { constants as osConstants } from 'node:os';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const sourcePath = resolve('../../docs/design-docs/batquai.avif');
const temporarySourcePath = resolve('public/luc-hao-icon-source.avif');

let child;
let receivedSignal;
let exitCode = 0;
let ownsTemporarySource = false;

const forwardSignal = signal => {
  receivedSignal ??= signal;
  child?.kill(signal);
};

process.on('SIGINT', forwardSignal);
process.on('SIGTERM', forwardSignal);

try {
  // Fail rather than overwrite a file left by an uncatchable termination or
  // created concurrently by another invocation.
  copyFileSync(sourcePath, temporarySourcePath, fsConstants.COPYFILE_EXCL);
  ownsTemporarySource = true;

  const result = await new Promise((resolveResult, rejectResult) => {
    child = spawn('pwa-assets-generator', [], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    child.once('error', rejectResult);
    child.once('close', (code, signal) => resolveResult({ code, signal }));

    if (receivedSignal) child.kill(receivedSignal);
  });

  exitCode = receivedSignal
    ? 128 + osConstants.signals[receivedSignal]
    : result.signal
      ? 128 + osConstants.signals[result.signal]
      : (result.code ?? 1);
} catch (error) {
  console.error(error);
  exitCode = 1;
} finally {
  try {
    if (ownsTemporarySource) rmSync(temporarySourcePath, { force: true });
  } catch (error) {
    console.error(`Could not remove temporary icon source: ${error}`);
    exitCode ||= 1;
  }

  process.off('SIGINT', forwardSignal);
  process.off('SIGTERM', forwardSignal);
}

process.exitCode = exitCode;
