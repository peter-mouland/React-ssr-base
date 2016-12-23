var glob = require("glob");
var fs = require("fs-extra");

glob("src/**/*.svg", {}, function (er, files) {
  files.forEach((file) => {
    fs.copySync(file, file.replace('src/', 'compiled/'))
  });
});
glob("src/app/**/*.scss", {}, function (er, files) {
  files.forEach((file) => {
    fs.copySync(file, file.replace('src/', 'compiled/'))
  });
});