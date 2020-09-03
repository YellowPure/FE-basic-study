/**
 * @module:  工具库
 * @author Liang Huang 
 * @date 2020-09-01 16:14:45 
 */
export function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  }
  if (item === undefined) {
    return 'UNDEFINED';
  }
  if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}