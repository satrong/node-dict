import fs from 'fs/promises'

export async function pathExists(path: string): Promise<boolean> {
  return fs.access(path).then(() => true).catch(() => false)
}

export async function ensureDir(path: string): Promise<void> {
  if (!await pathExists(path)) {
    await fs.mkdir(path, { recursive: true })
  }
}

export async function readJsonFile<T = any>(path: string): Promise<T | null> {
  try {
    const content = await fs.readFile(path, 'utf8')
    return JSON.parse(content)
  } catch (e) { }
  return null
}

export async function writeJsonFile(path: string, data: any): Promise<void> {
  const content = JSON.stringify(data, null, 2)
  await fs.writeFile(path, content, 'utf8')
}
