/**
 * @module:  递归
 * @author Liang Huang 
 * @date 2020-11-04 15:51:21 
 */

/**
 * 递归阶乘
 * @param {*} n 
 */
function factorial(n) {
  if (n === 0 || n === 1) return 1;

  return n * factorial(n - 1);
}

/**
 * 递归fibonacci函数
 * @param {*} n 
 */
function fibonacci(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  console.log(n)
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// console.log('fibonacci', fibonacci(6))

/**
 * 递归fibonacci函数(缓存)
 * @param {*} n 
 */
function fibonacciMemo(n) {
  const memo = [0,1];
  const fibonacci = (n, memo) => {
    if(memo[n] != null) return memo[n];
    return memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo);
  }
  return fibonacci(n, memo);
}

console.log('fibonacci', fibonacciMemo(10))
