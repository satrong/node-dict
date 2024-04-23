import assert from 'node:assert'
import crawler from '../src/crawler.bing'

export async function testBingCrawler() {
  const result = await crawler('test')
  assert.notEqual(result, null)
  if (result)
    assert.match(result.result, /测试/)
}
