import { readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

// Data build-ului (fusul României) decide ce articole de blog sunt deja publicate.
// BUILD_DATE=YYYY-MM-DD permite testarea locală a unui alt moment.
const buildDate =
  process.env.BUILD_DATE ??
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Bucharest' }).format(new Date())

const schedule = JSON.parse(
  readFileSync(new URL('./src/data/posts/schedule.json', import.meta.url), 'utf8'),
) as { firstPostDate: string; intervalDays: number }

function postDate(order: number) {
  const d = new Date(`${schedule.firstPostDate}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + order * schedule.intervalDays)
  return d.toISOString().slice(0, 10)
}

// Textul articolelor nepublicate nu trebuie să ajungă în bundle: la build, tot ce e
// după marcajul "// @@blocks" dintr-un fișier de articol cu dată viitoare e înlocuit cu [].
function embargoUnpublishedPosts(): Plugin {
  return {
    name: 'embargo-unpublished-posts',
    apply: 'build',
    enforce: 'pre',
    transform(code, id) {
      if (!/\/src\/data\/posts\/[^/]+\.ts$/.test(id)) return null
      const order = /export const order = (\d+)/.exec(code)
      const marker = code.indexOf('// @@blocks')
      if (!order || marker === -1) {
        this.error(`Fișier de articol invalid (lipsește order sau // @@blocks): ${id}`)
      }
      if (postDate(Number(order![1])) <= buildDate) return null
      return { code: `${code.slice(0, marker)}export const blocks = [];\n`, map: null }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), embargoUnpublishedPosts()],
  define: { __BUILD_DATE__: JSON.stringify(buildDate) },
  // Build-ul SSR e doar pentru prerender; nu are nevoie de copia din public/.
  build: { copyPublicDir: !isSsrBuild },
}))
