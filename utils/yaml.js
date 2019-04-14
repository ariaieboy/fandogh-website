import yamljs from 'js-yaml'

export const jsonManipulator = (json = {} , {path, value}) => {
  let arrayKeys = path.split('.')
  let modifiedJson = json
  arrayKeys.forEach((key, index) => {
    modifiedJson = index+1 === arrayKeys.length ? modifiedJson[key] = value : modifiedJson[key] = modifiedJson[key] || {}
  })
  return json
}

export const JsonToYaml = (json) => {
  return yamljs.safeDump(json)
}