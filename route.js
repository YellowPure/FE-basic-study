/**
 * 执行linkStore中的 action 并执行to函数
 * 或者switch到指定tab页
 * @param param0.url tab页路径
 * @param param0.selected tab页索引 从0开始
 */
const store = { link: {} };
const linkActionOrSwitchFirst = (params) => {
  const { url, selected } = params;
  const { link, tabsStore } = store;
  if (link.action) {
    link.to();
  } else {
    console.log('switchTab');
    // tabsStore.selected = selected || 0;
    // switchTab({
    //   url: url || '/pages/firstTab/index',
    // });
  }
};

/**
 * 处理router中重定向字段
 * @param readRedirect 是否读取router的redirect字段
 * @param params router.params
 * @param elseFn 额外函数
 */
const routerRedirectElse = (elseFn, readRedirect = true, params) => {
  console.log('........', ...arguments);
  if (readRedirect && params.redirect) {
    console.log('redirect');
    // Taro.redirectTo({ url: decodeURIComponent(params.redirect) });
  } else {
    return elseFn();
  }
};

/**
 * 检查是否是注册操作
 * @param elseFn 例外函数
 * @param cond 条件
 * @param url 跳转url
 */
const checkRegistered = (elseFn, cond, url) => {
  if (cond) {
    console.log('navigateTo');
    // navigateTo(url);
  } else {
    return elseFn();
  }
};
