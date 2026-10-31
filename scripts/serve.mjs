import http from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import {resolve, extname, sep} from 'node:path';
const root = resolve(new URL('..', import.meta.url).pathname);
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.pdf':'application/pdf','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8'};
http.createServer(async (req,res) => {
 try {
  const path = resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if (path !== root && !path.startsWith(root + sep)) {res.writeHead(403).end(); return;}
  const info = await stat(path);
  const file = info.isDirectory() ? resolve(path,'index.html') : path;
  const body = await readFile(file);
  res.writeHead(200,{'Content-Type':types[extname(file)] || 'application/octet-stream','Cache-Control':'no-cache'}).end(body);
 } catch {res.writeHead(404).end('Nicht gefunden');}
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
