import {build} from 'esbuild';
import {copyFile,mkdir} from 'node:fs/promises';
await mkdir(new URL('../assets/vendor/',import.meta.url),{recursive:true});
await build({stdin:{contents:'export {hyphenateSync} from "hyphen/de";',resolveDir:process.cwd()},bundle:true,format:'esm',minify:true,outfile:'assets/vendor/hyphen-de.js',banner:{js:'// hyphen/de (German 1996), bundled locally; see hyphen-LICENSE.txt.'}});
await copyFile('node_modules/hyphen/LICENSE','assets/vendor/hyphen-LICENSE.txt');
