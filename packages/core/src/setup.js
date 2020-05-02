function clasters(file) {
  const cluster = require('cluster')
  const os = require('os')

  const CPUS = os.cpus()
  if (cluster.isMaster) {
    CPUS.forEach(() => {
      cluster.fork()
    })
    cluster.on('listening', worker => {
      console.log('Cluster %d connected', worker.process.pid)
    })
    cluster.on('disconnect', worker => {
      console.log('Cluster %d disconnected', worker.process.pid)
    })
    cluster.on('exit', worker => {
      console.log('Cluster %d is dead', worker.process.pid)
      cluster.fork()
    })
  } else {
    const root = process.cwd()

    require(root + file)
  }
}

export function setup(file, clastersOptions = false) {
  /* eslint-disable */
  require = require('esm')(module /*, options*/)
  require('module-alias/register')

  const { parse } = require('graphql')
  const { readFileSync } = require('fs')

  const VALID_EXTENSIONS = ['graphql', 'graphqls', 'gql', 'gqls']

  function handleModule(m, filename) {
    const root = process.cwd()
    const content = readFileSync(filename, 'utf-8')

    m.exports = parse(content)
  }

  VALID_EXTENSIONS.forEach(ext => {
    require.extensions[`.${ext}`] = handleModule
  })

  process.setMaxListeners(0)
  process.on('SIGINT', function() {
    process.exit(0)
  })

  const pathToFile = process.cwd() + file
  if (clastersOptions) {
    clasters(pathToFile)
    return
  }

  require(pathToFile)
}
