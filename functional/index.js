const R = require('ramda');
const uploadImg = () => {
  // 返回promise对象
  return new Promise((resolve, reject) => {
    // 选择图片
    chooseImage({
      count: 1,
      fail: (res) => reject(res),
    }).then((r) => {
      console.log('选择图片=>', r.tempFilePaths[0]);
      const fileManager = getFileSystemManager();
      // 读取图片路径和信息
      fileManager.readFile({
        filePath: r.tempFilePaths[0],
        success: (res) => {
          if (res && res.data) {
            console.log('fileManager.readFile', res.data);
            // 组合数据并调用resolve
            resolve({ path: r.tempFilePaths[0], data: res.data });
          }
        },
      });
    });
  });
};

const readFile = (path) => {
  const fileManager = getFileSystemManager();
  return new Promise((resolve, reject) => {
    fileManager.readFile({
      filePath: path,
      success: (res) => resolve(res),
      fail: (err) => reject(err),
    });
  });
};
const uploadImg1 = async () => {
  const readFile = (path) => {
    const fileManager = getFileSystemManager();
    return new Promise((resolve, reject) => {
      fileManager.readFile({
        filePath: path,
        success: (res) => resolve(res),
        fail: (err) => reject(err),
      });
    });
  };
  const chooseRes = await chooseImage({ count: 1 });
  // 获取图片路径
  const path = R.compose(R.head, R.prop('tempFilePaths'))(chooseRes);
  // console.log()
  const fileRes = await readFile(path);
  console.log('fileRes', fileRes);
  return {
    path,
    data: R.prop('data')(fileRes),
  };
};

const whenFn = R.cond([
  [
    R.converge(R.and, [R.prop('name'), R.compose(R.not, R.isNil)]),
    () => ({
      path: '1',
      name: 1234,
    }),
  ],
]);

const truncate = R.when(
  R.propSatisfies(R.gt(R.__, 10), 'length'),
  R.pipe(R.take(10), R.append('…'), R.join(''))
);

const res = whenFn({ n: 1 });
// console.log('call when');
if (res) {
  console.log('res', res);
}
