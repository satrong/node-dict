import axios from 'axios'
import { HEADERS } from './const'

interface Response {
  result: {
    msg: string
    code: number
  }
  data: {
    entries: {
      explain: string
      entry: string
    }[]
    query: string
    language: string
    type: string
  }
}

export default async function (keyword: string) {
  const request = axios.create({
    baseURL: 'https://dict.youdao.com',
    withCredentials: true,
    headers: HEADERS,
  })

  const response = await request.get('/')

  if (response.status === 200) {
    const result = await request.get<Response>(`/suggest?num=1&ver=3.0&doctype=json&cache=false&q=${keyword}`)
    if (result.status === 200 && result.data?.result?.code === 200 && result.data.data.entries.length > 0) {
      const { entry, explain } = result.data.data.entries[0]
      return {
        crawler: 'youdao' as const,
        source: entry,
        result: explain,
      }
    }
  }

  return null
}
