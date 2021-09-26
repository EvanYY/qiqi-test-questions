/*
 * @Author: Evan
 * @Date: 2021-09-26 22:46:19
 * @Last Modified by:   yangyang
 * @Last Modified time: 2021-09-26 22:46:19
 */
import { ref } from 'vue'
import { genColor } from '../util'
export const useConditions = () => {
  const background = genColor()
  return {
    background,
  }
}
