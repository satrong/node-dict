# node-dict

> Nodejs >= 16.0.0 required.

### CLI Usage

#### Install

```bash
npm install node-dict -g
```

#### Usage

```bash
dict [word]
```

#### Example

```bash
$ dict hello
```

Output:

```
✔ [bing] hello
美[heˈləʊ]，英[həˈləʊ]，int. 你好；喂；您好；哈喽； 网络释义： 哈罗；哈啰；大家好；
```

#### Options

```
Usage: dict <word>

  -h, --help       Show help message
  --bing           Set Bing dictionary as default. (default)
  --youdao         Set Youdao dictionary as default
  -d, --default    Show default dictionary.
  -v, --version    Show version number
```

## API Usage

#### Install

```
npm i node-dict
```

#### Usage

```js
import { nodeDict } from 'node-dict'

const result = await nodeDict('hello')
console.log(result)
```

output:

```js
{
  crawler: 'bing',
  source: 'test',
  result: '美[test]，英[test]，v. 试验；测试；检测；测验； n. 试验；检测；考试；测验； 网络释义： 检验；考验；睾酮(testosterone)； '
}
```