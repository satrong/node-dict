import crawlerBing from './crawler.bing'
import crawlerYoudao from './crawler.youdao'

export interface NodeDictOptions {
  defaultDict: 'bing' | 'youdao'
}

export interface NodeDictResult {
  crawler: NodeDictOptions['defaultDict']
  source: string
  result: string
}

export async function nodeDict(word: string, options: NodeDictOptions = { defaultDict: 'bing' }) {
  const crawlers = [
    { name: 'bing', fn: crawlerBing },
    { name: 'youdao', fn: crawlerYoudao }
  ].sort(a => options.defaultDict === a.name ? -1 : 1)

  let result: NodeDictResult | null = null
  for (const crawler of crawlers) {
    result = await crawler.fn(word).catch(() => null)
    if (result) {
      break
    }
  }

  return result
}

export default nodeDict
