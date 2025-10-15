// Com esse script é possível verificar arquivos arquivos que não estão sendo utilizados dentro de src

const madge = require('madge');

madge('./src/', {
  // baseDir: "./src/",
  excludeRegExp: [
    /_mocks/,
    /drizzle\//,
    /types\/global.d.ts/,
    /application\/root\.tsx/
  ],
  fileExtensions: [
    "tsx",
    "ts"
  ],
  tsConfig: "./tsconfig.json",
})
.then((res) => {
	console.log(res.orphans());
  // return res.obj()
	// console.log(res.dot());
})
.catch((error) => {
  console.error(error)
});