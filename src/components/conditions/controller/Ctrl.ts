/*
 * @Author: Evan
 * @Date: 2021-09-26 22:46:00
 * @Last Modified by:   yangyang
 * @Last Modified time: 2021-09-26 22:46:00
 */
import FormModel from '../model/FormModel'
import { TreeNode } from '../interface'

export default class Ctrl {
  private formModel = new FormModel()
  private genNonDuplicateId(n = 13): string {
    // 生成n位长度的字符串
    const str: any = 'abcdefghijklmnopqrstuvwxyz0123456789' // 可以作为常量放到random外面
    let result = ''
    for (let i = 0; i < n; i++) {
      const random: any = Math.random() * str.length
      result += str[parseInt(random, 10)]
    }
    return result
  }
  public getForm() {
    return this.formModel.getFormModel()
  }
  public getFormEnumMap() {
    return this.formModel.getEnumMap()
  }
  public getTreeModel(): TreeNode {
    return {
      id: this.genNonDuplicateId(),
      type: '',
      keys: [],
      grops: [],
      level: 0,
    }
  }
  public async getConditions() {
    return new Array(10)
      .fill('')
      .map((_v, i) => `Conditions${i}`)
      .map((v) => ({ value: v, label: v }))
  }
  public getOperator() {
    return [
      { value: '1', label: '等于' },
      { value: '2', label: '不等于' },
      { value: '3', label: '大于' },
      { value: '4', label: '小于' },
      { value: '5', label: '区间' },
    ]
  }
}
