import { readdirSync, rename } from 'fs'
import { resolve } from 'path'

// Get path to image directory
// const dir = resolve('./', 'utils')


const directories = source => readdirSync(source, {
   withFileTypes: true
}).reduce((a, c) => {
   c.isDirectory() && c.name.charAt(0)!='.'&& a.push(c.name)
   return a
}, [])



let dirs = directories('.')

const ren =(f)=>{
  let [name,ext]= f.split('.')
  if (ext=='js') return name+'.mjs'
  return f
}
for (let d of dirs){
  let dir = resolve('./', d)
  const files =  readdirSync(dir)
  files.forEach(
    file =>rename(`${dir}/${file}`,`${dir}/${ren(file)}`,err => console.log(err)))
}
  



// files.forEach(file => rename(
//   `${dir}/'${file}`,
//   `${dir}/${file}`,
//   err => console.log(err)
// ));