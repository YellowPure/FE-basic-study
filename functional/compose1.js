const _ = require('lodash/fp');
var R = require('ramda');

/**
 * 删除对象中空元素的key
 */
let deleteUndefinedValue = (obj) => {
  const _obj = { ...obj };
  for (const key of Object.keys({ _obj })) {
    if (_obj[key] === undefined || _obj[key] === null) {
      delete _obj[key];
    }
  }
  return _obj;
};
deleteUndefinedValue = R.filter(R.compose(R.not, R.isNil));
const a = { name: 'ssss', bill: null };
console.log(deleteUndefinedValue(a));

// TODO transfer => functional
const uploadImg = () => {
  return new Promise((resolve, reject) => {
    chooseImage({
      count: 1,
      fail: res => reject(res)
    }).then(r => {
      console.log('选择图片=>', r.tempFilePaths[0])
      const fileManager = getFileSystemManager();
      fileManager.readFile({
        filePath: r.tempFilePaths[0],
        success: (res) => {
          if (res && res.data) {
            console.log('fileManager.readFile', res.data);
            resolve({ path: r.tempFilePaths[0], data: res.data },)
          }
        }
      })
    });
  })
}


const readFile = R.curry((callback, url) => {
  const fileManager = getFileSystemManager();
  fileManager.readFile({
    filePath: url,
    success: callback
  })
})

const chooseImage = R.curry(callback => {
  const res = await chooseImage({
    count: 1,
  }).then(res => callback(res));

})

uploadImg = () => {
  const getRes = R.compose(R.prop('data'))
  const choose = R.compose(R.head, R.prop('tempFilePaths'), chooseImage)
  const read = R.compose(readFile(), url => url);
  return R.compose(val => new Promise((resolve) => resolve(val)),)
}

