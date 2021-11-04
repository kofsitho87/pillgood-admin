module.exports = {
  apps: [
    {
      name: 'admin',
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: 'yarn start'
    }
  ]
}
