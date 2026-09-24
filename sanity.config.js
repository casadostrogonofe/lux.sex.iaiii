import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity-schemas/index.js'

export default defineConfig({
  name: 'luxsex',
  title: 'Lux.sex Studio',
  projectId: '8um1375u',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
