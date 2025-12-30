import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'

const THEME_NAME = 'github-light'
const loadedLanguages = new Set<string>()

const languageLoaders: Record<string, () => Promise<{ default: unknown }>> = {
  javascript: () => import('@shikijs/langs/javascript'),
  js: () => import('@shikijs/langs/javascript'),
  typescript: () => import('@shikijs/langs/typescript'),
  ts: () => import('@shikijs/langs/typescript'),
  tsx: () => import('@shikijs/langs/tsx'),
  jsx: () => import('@shikijs/langs/jsx'),
  json: () => import('@shikijs/langs/json'),
  jsonc: () => import('@shikijs/langs/jsonc'),
  html: () => import('@shikijs/langs/html'),
  css: () => import('@shikijs/langs/css'),
  markdown: () => import('@shikijs/langs/markdown'),
  md: () => import('@shikijs/langs/markdown'),
  bash: () => import('@shikijs/langs/bash'),
  shellscript: () => import('@shikijs/langs/shellscript'),
  sh: () => import('@shikijs/langs/shellscript'),
  yaml: () => import('@shikijs/langs/yaml'),
  yml: () => import('@shikijs/langs/yaml'),
  python: () => import('@shikijs/langs/python'),
  py: () => import('@shikijs/langs/python'),
  go: () => import('@shikijs/langs/go'),
  sql: () => import('@shikijs/langs/sql'),
  graphql: () => import('@shikijs/langs/graphql'),
  diff: () => import('@shikijs/langs/diff'),
}

let highlighterPromise: Promise<import('shiki/core').HighlighterCore> | null =
  null

const getHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const [
        { createHighlighterCore },
        { createOnigurumaEngine },
        wasmModule,
        themeModule,
      ] = await Promise.all([
        import('shiki/core'),
        import('shiki/engine/oniguruma'),
        import('shiki/wasm'),
        import('@shikijs/themes/github-light'),
      ])

      return createHighlighterCore({
        engine: createOnigurumaEngine(wasmModule),
        themes: [themeModule.default],
        langs: [],
      })
    })()
  }
  return highlighterPromise
}

const ensureLanguage = async (language: string) => {
  const normalized = language.toLowerCase()
  if (normalized === 'plaintext') return normalized
  if (loadedLanguages.has(normalized)) return normalized

  const loader = languageLoaders[normalized]
  if (!loader) return 'plaintext'

  const highlighter = await getHighlighter()
  const langModule = await loader()
  await highlighter.loadLanguage(langModule.default as never)
  loadedLanguages.add(normalized)
  return normalized
}

export type CodeBlockProps = {
  children?: React.ReactNode
  className?: string
} & React.HTMLProps<HTMLDivElement>

function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  return (
    <div
      className={cn(
        'not-prose flex w-full flex-col overflow-clip border',
        'border-border bg-card text-card-foreground rounded-xl',
        className
      )}
      {...props}>
      {children}
    </div>
  )
}

export type CodeBlockCodeProps = {
  code: string
  language?: string
  theme?: string
  className?: string
} & React.HTMLProps<HTMLDivElement>

function CodeBlockCode({
  code,
  language = 'tsx',
  theme = 'github-light',
  className,
  ...props
}: CodeBlockCodeProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)

  useEffect(() => {
    async function highlight() {
      if (!code) {
        setHighlightedHtml('<pre><code></code></pre>')
        return
      }

      try {
        const highlighter = await getHighlighter()
        const resolvedLanguage = await ensureLanguage(language)
        const html = await highlighter.codeToHtml(code, {
          lang: resolvedLanguage,
          theme: THEME_NAME,
        })
        setHighlightedHtml(html)
      } catch (error) {
        setHighlightedHtml('<pre><code></code></pre>')
      }
    }
    highlight()
  }, [code, language, theme])

  const classNames = cn(
    'w-full overflow-x-auto text-[13px] [&>pre]:px-4 [&>pre]:py-4',
    className
  )

  // SSR fallback: render plain code if not hydrated yet
  return highlightedHtml ? (
    <div
      className={classNames}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      {...props}
    />
  ) : (
    <div className={classNames} {...props}>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export type CodeBlockGroupProps = React.HTMLAttributes<HTMLDivElement>

function CodeBlockGroup({
  children,
  className,
  ...props
}: CodeBlockGroupProps) {
  return (
    <div
      className={cn('flex items-center justify-between', className)}
      {...props}>
      {children}
    </div>
  )
}

export { CodeBlock, CodeBlockCode, CodeBlockGroup }
