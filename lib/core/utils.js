const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const log = console.log
const chalk = require('chalk')
/**
 * log
 */

const info = (...info) => {
  log(chalk.blue(info))
}

const error = (...info) => {
  log(chalk.red(info))
}

const clear = () => {
  console.clear()
}

/**
 *
 * @param {*} name
 * @param {*} dest
 * @param {*} template
 * @param {*} filename
 * @description   handleEjsToFile(name, dest, templatePath, `${name}.vue`)
 */
const handleEjsToFile = async (name, css, dest, template, filename) => {
  // 获取模块引擎的路径
  const templatePath = path.resolve(__dirname, template)
  const cpnPath = dest && dest.replace('router', 'views').replace('src', '@') + `/${name}.vue`
  let routePath
  if (!!~dest.indexOf('router')) {
    routePath = dest.replace('/router', '').replace('src', '')
  }
  const result = await ejsCompile(templatePath, { css, name, cpnPath, lowerName: name.toLowerCase(), routePath })
  // 判断文件不存在,那么就创建文件

  try {
    mkdirSync(dest)
    const targetPath = path.resolve(dest, filename)
    await writeFile(!!~dest.indexOf('router'), targetPath, result)
    if (!!~dest.indexOf('router')) {
      info('路由创建成功-------')
    } else {
      info('组件创建成功-------')
    }
  } catch (err) {
    error(err)
  }
}

const ejsCompile = (templatePath, data = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, options, (err, str) => {
      if (err) {
        reject(err)
        return
      }
      resolve(str)
    })
  })
}

const writeFile = (type, path, content) => {
  if (fs.existsSync(path)) {
    // error('the file already exists~')
    let text = type ? '路由' : '组件'
    return Promise.reject(`${text}文件已经存在了啊--------`)
  }

  return fs.promises.writeFile(path, content)
}

const mkdirSync = dirname => {
  if (fs.existsSync(dirname)) {
    //continue
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
    }
  }
  return true
}

module.exports = {
  info,
  error,
  clear,
  handleEjsToFile
}
