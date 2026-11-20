// V3 entrypoint: deliver the committed front page as the entry image.
//
// Primary behaviour: copy the entry.png committed next to this file into the
// output directory the grader provides. That is the whole job — the image is
// pre-rendered and checked, so the grader never has to render anything.
//
// Fallback: if the committed image is missing (it should never be), try the
// bundled render script once; if that also fails, exit non-zero with a clear
// message rather than emitting a partial or empty entry.
import { copyFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const committed = join(here, 'entry.png');
const target = join(outDir, 'entry.png');

if (existsSync(committed)) {
  copyFileSync(committed, target);
  console.log('copied entry.png to ' + target);
} else {
  const renderer = join(here, 'render.mjs');
  if (!existsSync(renderer)) throw new Error('committed entry.png missing and no render.mjs fallback present');
  execFileSync(process.execPath, [renderer, target], { stdio: 'inherit', timeout: 55000 });
  if (!existsSync(target)) throw new Error('render fallback did not produce ' + target);
  console.log('rendered fallback entry.png to ' + target);
}
