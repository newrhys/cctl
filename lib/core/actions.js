const { handleEjsToFile } = require('./utils')
const { enumConfig } = require('./configs')

const addComponent = async (language, css, name, dest) => {
  genComponent(language, css, name, dest)
}

const addVueComponentWithRouter = async (language, css, name, dest) => {
  genComponent(language, css, name, dest)
  //add router
  const suffix = language === enumConfig.TYPESCRIPT ? 'ts' : 'js'
  const routerPath = '../template/vue-router.js.ejs'
  let routerDest = dest.replace('views', 'router')
  handleEjsToFile(name, css, routerDest, routerPath, `${name}.${suffix}`)
}

const genComponent = async (language, css, name, dest) => {
  // console.log(dest, '---dest ')
  const templatePath = language === enumConfig.TYPESCRIPT ? '../template/component3_ts.vue.ejs' : '../template/component3_js.vue.ejs'
  handleEjsToFile(name, css, dest, templatePath, `${name}.vue`)
}
module.exports = {
  addVueComponentWithRouter,
  addComponent
}
