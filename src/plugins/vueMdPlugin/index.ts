import type { PluginOption } from 'vite'
import { createMarkdown } from './createMarkdown'
import type { MarkdownOptions } from './createMarkdown'

const vitePluginMd = (opts?: MarkdownOptions): PluginOption => {
  const md = createMarkdown(opts)
  return {
    name: 'vite-plugin-md',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('.md')) {
        const env: any = {}
        const html = md?.render(code, env)
        const { sfcBlocks } = env
        return [
          sfcBlocks?.scriptSetup ? sfcBlocks?.scriptSetup?.content : '',
          `<template><div class="theme-default-content" style="width:800px;margin:0 auto;">${html}</div></template>`,
          ...(sfcBlocks?.styles.map((item: any) => item.content) ?? []),
          ...(sfcBlocks?.customBlocks?.map((item: any) => item.content) ?? [])
        ].join('\n')
      }
    }
  }
}

export { vitePluginMd }

export default vitePluginMd
