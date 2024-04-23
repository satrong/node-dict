import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import ora from 'ora'
import { ensureDir, readJsonFile, writeJsonFile } from './helper'
import nodeDict, { type NodeDictOptions } from './index'

const appCacheDir = path.join(os.homedir(), '.node-dict')
const appCacheFile = path.join(appCacheDir, 'config.json')

export default async function start() {
  const word = encodeURI(process.argv.slice(2).join(' '))

  if (await setDefaultDict(word)) {
    process.exit(0)
  }

  if (['-h', '--help'].includes(word)) {
    console.log(`Usage: dict <word>\n`)
    console.log(`  -h, --help       Show help message`)
    console.log(`  --bing           Set Bing dictionary as default. (default)`)
    console.log(`  --youdao         Set Youdao dictionary as default`)
    console.log(`  -d, --default    Show default dictionary.`)
    console.log(`  -v, --version    Show version number`)

    process.exit(0)
  }

  if (['-v', '--version'].includes(word)) {
    const version = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf-8')).version
    console.log(version)
    process.exit(0)
  }

  const config = await readJsonFile<NodeDictOptions>(appCacheFile) || { defaultDict: 'bing' }

  if (['-d', '--default'].includes(word)) {
    console.log(`Current default dictionary: ${config.defaultDict.slice(0, 1).toUpperCase() + config.defaultDict.slice(1)}.`)
    process.exit(0)
  }

  const spinner = ora().start()
  const result = await nodeDict(word, config)

  if (result) {
    spinner.succeed(`[${result.crawler}] ${result.source}\n${result.result}`)
  } else {
    spinner.fail('No result found.')
  }
}

async function setDefaultDict(word: string) {
  if (['--bing', '--youdao'].includes(word)) {
    await ensureDir(appCacheDir)
    const w = word.replace('--', '')
    await writeJsonFile(appCacheFile, { defaultDict: w })
    console.log(`Default dictionary set to ${w.slice(0, 1).toUpperCase() + w.slice(1)}.`)
    return true
  }
  return false
}

if (process.env.NODE_ENV === 'development') {
  start()
}
