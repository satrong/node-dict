import assert from 'node:assert'
import crawler from '../src/crawler.youdao'

export async function testYoudaoCrawler() {
  const result = await crawler('node')
  assert.notEqual(result, null)
  if (result)
    assert.match(result.result, /节点/)
}
