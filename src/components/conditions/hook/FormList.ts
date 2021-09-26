/*
 * @Author: Evan
 * @Date: 2021-09-26 22:46:22
 * @Last Modified by:   yangyang
 * @Last Modified time: 2021-09-26 22:46:22
 */
import { shallowRef, unref, ref, Ref } from 'vue'
import Ctrl from '../controller/Ctrl'
import { cloneDeep } from 'lodash'
import { FormCell } from '../interface'
export default function () {
  const CTRL = new Ctrl()
  const ENUM = CTRL.getFormEnumMap()
  const formState: any = ref({})
  const formCellUI: Ref<{ key: number }[]> = shallowRef([])
  // const rules = shallowRef({})
  // const getRules
  const addCell = () => {
    const key = formCellUI.value.length ? Math.max(...formCellUI.value.map((v) => v.key)) + 1 : 0
    const ingore: any = {}
    ingore[key + ENUM.RES] = ''
    ingore[key + ENUM.OPE] = ''
    ingore[key + ENUM.VAL] = ''
    const store = cloneDeep(unref(formState))
    formState.value = {
      ...store,
      ...ingore,
    }
    formCellUI.value.push({ key })
    // rules.value = getRules()
  }
  const removeCell = (key: number) => {
    const index = formCellUI.value.findIndex((v: any) => v.key === key)
    formCellUI.value.splice(index, 1)
    const store: any = cloneDeep(unref(formState))
    delete store[index + ENUM.RES]
    delete store[index + ENUM.OPE]
    delete store[index + ENUM.VAL]
    formState.value = store
    // rules.value = getRules()
  }
  const resolveForm = () =>
    formCellUI.value.map((v) => ({
      [ENUM.RES]: formState.value[`${v.key}${ENUM.RES}`],
      [ENUM.OPE]: formState.value[`${v.key}${ENUM.OPE}`],
      [ENUM.VAL]: formState.value[`${v.key}${ENUM.VAL}`],
    })) as FormCell[]
  return {
    width: '200px',
    selectsCondition: CTRL.getOperator(),
    formState,
    formCellUI,
    ENUM,
    addCell,
    removeCell,
    resolveForm,
  }
}
