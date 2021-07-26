const DebugControl = require('../utilities/debug.js')
DebugControl.setLevel(DebugControl.levels.NONE)

export default {
  server: require('../app')
}
