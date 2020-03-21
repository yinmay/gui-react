//自动生成文件夹
const fs = require('fs');
const path = require('path');
const ComponentName = process.argv[2];
let className = false;
const create = () => {
  try {
    className = trans(ComponentName);
    if (className) {
      fs.mkdirSync(path.resolve(__dirname, '../../src', ComponentName));
      copy(
        __dirname + '/componentTemplate',
        path.resolve(__dirname, '../../src', ComponentName)
      );
      copyStories(
        __dirname + '/emaple.stories.tsx',
        path.resolve(
          __dirname,
          '../../stories',
          `./${ComponentName}.stories.tsx`
        )
      );
    }
  } catch (error) {
    console.log(error);
    console.error('楼层已创建啦！！！');
  }
};

const copyStories = (src, dist) => {
  let file = fs.createReadStream(src);
  let out = fs.createWriteStream(dist);

  file.pipe(out);
};

const trans = (name) => {
  const first = name.split('')[0];
  const left = name.slice(1);
  if (!/[A-Z]/.test(first)) {
    console.log('组件首字母需要大写');
    return false;
  }
  return (first + left.replace(/([A-Z])/g, '-$1')).toLowerCase();
};
const copy = (src, dst) => {
  let paths = fs.readdirSync(src); //同步读取当前目录
  paths.forEach(function(item) {
    let _src = src + '/' + item;
    let _dst = dst + '/' + item;
    fs.stat(_src, function(err, stats) {
      //stats  该对象 包含文件属性
      if (err) throw err;
      if (stats.isFile()) {
        //如果是个文件则拷贝
        var data = fs.readFileSync(_src);
        fs.writeFileSync(_dst, data);
        if (_dst.indexOf(ComponentName + '/index.js') > -1) {
          replaceFile(
            path.resolve(__dirname, '../../src', ComponentName, 'index.js'),
            [/Demo/g, /demo/g],
            [ComponentName, className]
          );
        }
      } else if (stats.isDirectory()) {
        //是目录则 递归
        checkDirectory(_src, _dst, copy);
      }
    });
  });
};
const checkDirectory = (src, dst, callback) => {
  fs.access(dst, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdirSync(dst);
      callback(src, dst);
    } else {
      callback(src, dst);
    }
  });
};

const replaceFile = (filePath, sourceRegx, targetStr) => {
  let data = fs.readFileSync(filePath, 'utf-8');
  let str = data.toString();
  str = str.replace(sourceRegx[0], targetStr[0]);
  str = str.replace(sourceRegx[1], targetStr[1]);
  fs.writeFileSync(filePath, str);
};

create();
