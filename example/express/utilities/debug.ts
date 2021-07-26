const levels = {
  NONE: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
}

let level = levels.HIGH

export default {
  levels,
  setLevel: (l: number) => level = l,
  log: {
    parameters: (parameters: any[]) => {
      if(levels.HIGH > level) return
      console.group()
      parameters.forEach((p: { name: any; value: any }) => console.log(`${p.name}:`, p.value))
      console.groupEnd()
    },
    functionName: (name: any) => {
      if(levels.MEDIUM > level) return
      console.log(`\nEXECUTING: ${name}\n`)
    },
    flow: (flow: any) => {
      if(levels.LOW > level) return
      console.log(`\n\n\nBEGIN FLOW: ${flow}\n\n\n`)
    },
    variable: ({name, value}: any) => {
      if(levels.HIGH > level) return
      console.group()
      console.group()
      console.log(`VARIABLE ${name}:`, value)
      console.groupEnd()
      console.groupEnd()
    },
    request: () => (req: { url: any; query: any; body: any },res: any,next: () => any) => {
      if(levels.HIGH > level) return next()
      console.log('Hit URL', req.url, 'with following:')
      console.group()
      console.log('Query:', req.query)
      console.log('Body:', req.body)
      console.groupEnd()
      return next()
    }
  }
}
