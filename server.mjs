import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'
import { createServer } from 'node:http'

const root = join(process.cwd(), 'dist')
const port = Number(process.env.PORT ?? 4173)

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
}

function safePath(url) {
  const pathname = decodeURIComponent(new URL(url, 'http://localhost').pathname)
  const filePath = normalize(join(root, pathname))
  return filePath.startsWith(root) ? filePath : join(root, 'index.html')
}

createServer((request, response) => {
  let filePath = safePath(request.url ?? '/')

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(root, 'index.html')
  }

  response.setHeader('Content-Type', contentTypes[extname(filePath)] ?? 'application/octet-stream')
  createReadStream(filePath).pipe(response)
}).listen(port, '0.0.0.0', () => {
  console.log(`RallyPad demo listening on ${port}`)
})
