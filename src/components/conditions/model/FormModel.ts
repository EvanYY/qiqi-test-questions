/*
 * @Author: Evan
 * @Date: 2021-09-26 22:46:11
 * @Last Modified by:   yangyang
 * @Last Modified time: 2021-09-26 22:46:11
 */
import { FormCell } from '../interface'
export default class FormModel {
  public getFormModel(): FormCell {
    return {
      resource: '',
      operator: '',
      value: '',
    }
  }
  public getEnumMap() {
    return {
      RES: 'resource',
      OPE: 'operator',
      VAL: 'value',
    }
  }
}
