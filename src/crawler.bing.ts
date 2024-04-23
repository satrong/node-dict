import axios from 'axios'
import { HEADERS } from './const'

export default async function (keyword: string) {
  const request = axios.create({
    baseURL: 'https://cn.bing.com',
    withCredentials: true,
    headers: HEADERS,
  })

  const response = await request.get('/dict')

  if (response.status === 200) {
    const result = await request.get<string>(`/dict/search?q=${keyword}`)
    if (result.status === 200) {
      const matched = result.data.match(/<meta name="description" content="([^"]+)/) || []
      if (matched.length > 1) {
        return {
          crawler: 'bing' as const,
          source: keyword,
          result: matched[1].replace(/^必应词典为您提供.+的释义，/, '')
        }
      }
    }
  }

  return null
}
