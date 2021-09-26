<template>
  <!-- 可变成表单进行校验  循环为formItem-->
  <div v-for="(v, i) in formCellUI" :key="i" style="margin-top: 10px">
    <a-space>
      <a-input
        v-model:value="formState[`${i}${ENUM.RES}`]"
        :placeholder="`${i}${ENUM.RES}`"
        :style="{ width }"
      />
      <a-select
        defaultActiveFirstOption
        v-model:value="formState[`${i}${ENUM.OPE}`]"
        :style="{ width }"
      >
        <a-select-option :value="v.value" v-for="v in selects" :key="v.value">
          {{ v.label }}
        </a-select-option>
      </a-select>
      <a-input
        v-model:value="formState[`${i}${ENUM.VAL}`]"
        :placeholder="`${i}${ENUM.VAL}`"
        :style="{ width }"
      />
    </a-space>
  </div>
</template>

<script lang="ts">
  import { defineComponent, shallowRef, unref, ref, Ref, watch } from 'vue'
  import Ctrl from '../controller/Ctrl'
  import { cloneDeep } from 'lodash'
  import { FormCell } from '../interface'

  export default defineComponent({
    name: 'FormList',
    props: {
      keys: Array,
    },
    emits: ['update:keys', 'change'],
    setup(_props, { emit }) {
      const CTRL = new Ctrl()
      const ENUM = CTRL.getFormEnumMap()
      const formState: any = ref({})
      const formCellUI: Ref<{ key: number }[]> = shallowRef([])
      // const rules = shallowRef({})
      // const getRules
      const addCell = () => {
        const key = formCellUI.value.length
          ? Math.max(...formCellUI.value.map((v) => v.key)) + 1
          : 0
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
        debugger
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
      watch(
        formState,
        (cur) => {
          console.log('🚀 ~ file: FormList.vue ~ line 51 ~ watch ~ cur', cur)
          // emit('update:keys', resolveForm())
          // emit('change', { target: 'keys', value: resolveForm() })
          // emit('change', resolveForm())
        },
        {
          deep: true,
        }
      )
      return {
        width: '200px',
        selects: CTRL.getOperator(),
        formState,
        formCellUI,
        ENUM,
        addCell,
        removeCell,
      }
    },
  })
</script>

<style lang="less" scoped></style>
