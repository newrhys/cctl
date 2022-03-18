const inquirer = require('inquirer')
const { addVueComponentWithRouter, addComponent } = require('./actions')
const { enumConfig } = require('./configs')

const registerCommand = program => {
  program
    .command('cpn <name>')
    .description('create vue component, 例如: cctl cpn NavBar -d(目录) src/views')
    .action(async name => {
      const { language, css } = await selectRes()
      addComponent(language, css, name, program.opts().dest || `src/views/${name}`)
    })

  program
    .command('page <name>')
    .description('create vue component and router, 例如: cctl page Home -d(目录) src/views/main/home')
    .action(async name => {
      const { language, css } = await selectRes()
      addVueComponentWithRouter(language, css, name, program.opts().dest || `src/views/${name}`, css)
    })
}

const selectRes = async () => {
  const { language } = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: '选择类型',
      choices: [
        { name: 'ts', value: enumConfig.TYPESCRIPT },
        { name: 'js', value: enumConfig.JAVASCRIPT }
      ]
    }
  ])

  const { css } = await inquirer.prompt([
    {
      type: 'list',
      name: 'css',
      message: '选择css预编译',
      choices: [
        { name: 'less', value: enumConfig.LESS },
        { name: 'scss', value: enumConfig.SASS }
      ]
    }
  ])
  return { language, css }
}
module.exports = { registerCommand }
