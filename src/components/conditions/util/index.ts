/*
 * @Author: Evan
 * @Date: 2021-09-26 22:46:15
 * @Last Modified by:   yangyang
 * @Last Modified time: 2021-09-26 22:46:15
 */
export const genColor = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}
