const registerOptions = (program, pkg) => {
  // 增加自己的options
  program.name('cctl').description('CLI to create vue3 template of component with router map | 就是创建组件路由的').version(pkg.version, '-v, --version', 'output the current version')
  program.option('-d --dest <dest>', 'a destination folder, 例如: -d src/veiws')
}

module.exports = registerOptions
