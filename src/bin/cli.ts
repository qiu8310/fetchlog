import { cmd } from '@serpent/common-cli/cmder'
import { COMMAND_KEY, COMMAND_VERSION } from 'src/base/constant.js'
import { CONFIG } from 'src/base/config.js'
import path from 'path'
import fg from 'fast-glob'
import AdmZip from 'adm-zip'

export default cmd(
  {
    usage:   `${COMMAND_KEY} <alias_or_file_patterns>`,
    version: COMMAND_VERSION,
  },
  async({ args, logger }) => {

    if (!args.length) {
      logger.error(`请提供要打包的文件路径`)
      process.exitCode = 1
      return
    }

    const filePatterns: string[] = []
    args.forEach(arg => {
      if (CONFIG[arg]) {
        filePatterns.push(...CONFIG[arg])
      } else {
        filePatterns.push(arg)
      }
    })

    const { XDG_DATA_HOME, XDG_CACHE_HOME, XDG_CONFIG_HOME, HOME = '' } = process.env
    const replaces: Record<string, string> = {
      $XDG_DATA_HOME:   XDG_DATA_HOME ? path.resolve(XDG_DATA_HOME) : path.resolve(HOME, '.local'),
      $XDG_CACHE_HOME:  XDG_CACHE_HOME ? path.resolve(XDG_CACHE_HOME) : path.resolve(HOME, '.cache'),
      $XDG_CONFIG_HOME: XDG_CONFIG_HOME ? path.resolve(XDG_CONFIG_HOME) : path.resolve(HOME, '.config'),
    }

    const files = await fg(
      filePatterns.map(pattern => pattern.replace(/(\$\w+)/g, (key) => replaces[key] || key)),
      { absolute: true },
    )

    if (files.length === 0) {
      logger.error(`使用如下模式搜索，未搜索到任何日志文件：`)
      filePatterns.forEach(pattern => {
        logger.error(` - ${pattern}`)
      })
      process.exitCode = 2
      return
    }

    const zip = new AdmZip()
    files.forEach(file => zip.addLocalFile(file))

    const timestamp = new Date()
      .toLocaleString()
      .replace(/[^\d]/g, '-')
    const filename = `fetchlog-${timestamp}.zip`
    const filepath = path.resolve(process.cwd(), filename)
    await zip.writeZipPromise(filepath)
    logger.clog(`日志文件打包完成：%c${filepath}`, 'green')
  },
)
