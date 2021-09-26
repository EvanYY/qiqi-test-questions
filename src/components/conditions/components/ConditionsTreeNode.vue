<template>
  <div class="room" :style="{ background }">
    <a-select
      defaultActiveFirstOption
      :value="Type"
      @update:value="$emit('update:Type', $event)"
      style="width: 300px"
    >
      <a-select-option :value="v.value" v-for="v in selects" :key="v.value">
        {{ v.label }}
      </a-select-option>
    </a-select>
    <div class="base">
      <div v-for="(v, i) in Keys" :key="i" style="margin-top: 10px">
        <a-space>
          <a-input v-model:value="v.resource" :placeholder="`${i}${ENUM.RES}`" :style="{ width }" />
          <a-select defaultActiveFirstOption v-model:value="v.operator" :style="{ width }">
            <a-select-option :value="v.value" v-for="v in selectsed" :key="v.value">
              {{ v.label }}
            </a-select-option>
          </a-select>
          <a-input v-model:value="v.value" :placeholder="`${i}${ENUM.VAL}`" :style="{ width }" />
          <div @click="removeCell(i)"> delete </div>
        </a-space>
      </div>
    </div>
    <div class="base">
      <ConditionsCopy
        v-for="(v, i) in Grops"
        :key="i + `${Math.random()}`"
        :selects="selects"
        v-model:Type="v.type"
        v-model:Keys="v.keys"
        v-model:Grops="v.grops"
      />
    </div>
    <div class="base">
      <a-space>
        <a-button type="primary" @click="addCell">add form</a-button>
        <a-button type="primary" @click="addGroup">add addGroup</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useConditions } from '../hook/Conditions'
  import Ctrl from '../controller/Ctrl'
  import { cloneDeep } from 'lodash'
  export default defineComponent({
    name: 'ConditionsCopy',
    props: {
      selects: Array,
      Type: String,
      Keys: Array,
      Grops: Array,
    },
    emits: ['update:Type', 'update:Keys', 'update:Grops'],
    setup(props, { emit }) {
      const CTRL = new Ctrl()
      const CONTAINER = useConditions()
      const addGroup = () => {
        const model = CTRL.getTreeModel()
        console.log('🚀 ~ file: Conditions.vue ~ line 79 ~ addGroup ~ model', model)
        emit('update:Grops', props.Grops?.concat(model))
      }

      const ENUM = CTRL.getFormEnumMap()
      const addCell = () => {
        const ingore = cloneDeep(props.Keys)
        ingore?.push(CTRL.getForm())
        emit('update:Keys', ingore)
      }
      const removeCell = (key: number) => {
        const ingore = cloneDeep(props.Keys)
        ingore?.splice(key, 1)
        emit('update:Keys', ingore)
      }
      return {
        ...CONTAINER,
        width: '200px',
        selectsed: CTRL.getOperator(),
        ENUM,
        addCell,
        removeCell,
        addGroup,
      }
    },
  })
</script>

<style lang="less" scoped>
  .room {
    width: 100%;
    overflow: auto;
    min-height: 200px;
    padding: 30px 20px;
  }
  .base {
    width: 100%;
    margin-top: 20px;
  }
</style>
