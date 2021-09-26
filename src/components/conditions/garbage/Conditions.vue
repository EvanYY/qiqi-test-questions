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
      <FormList ref="FormListRef" />
    </div>
    <div class="base" v-for="(v, i) in TreeNode.grops" :key="i + `${Math.random()}`">
      <ConditionsContainer
        :selects="selects"
        v-model:Type="TreeNode.grops[i].type"
        v-model:Keys="TreeNode.grops[i].keys"
        v-model:Grops="TreeNode.grops[i].grops"
      />
    </div>
    <div class="base">
      <a-space>
        <a-button type="primary" @click="addFrom">add form</a-button>
        <a-button type="primary" @click="addGroup">add addGroup</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, watch } from 'vue'
  import FormList from './FormList.vue'
  import { useConditions } from '../hook/Conditions'
  import Ctrl from '../controller/Ctrl'
  // import { cloneDeep } from 'lodash'

  export default defineComponent({
    name: 'ConditionsContainer',
    components: { FormList },
    props: {
      selects: Array,
      Type: String,
      Keys: Array,
      Grops: Array,
    },
    emits: ['update:Type', 'update:Keys', 'update:Grops'],
    setup(_props, { emit }) {
      const CTRL = new Ctrl()
      const CONTAINER = useConditions()
      const TreeNode = reactive(CTRL.getTreeModel())
      const FormListRef = ref()

      const addFrom = () => {
        FormListRef.value.addCell()
        console.log(
          '🚀 ~ file: Conditions.vue ~ line 70 ~ addFrom ~ FormListRef.value',
          FormListRef.value
        )
      }
      const addGroup = () => {
        const model = CTRL.getTreeModel()
        console.log('🚀 ~ file: Conditions.vue ~ line 79 ~ addGroup ~ model', model)
        TreeNode.grops.push(model)
      }
      watch(
        () => TreeNode,
        (cur) => {
          // debugger
          console.log('🚀 ~ file: Conditions.vue ~ line 77 ~ watch ~ cur', cur)
          emit(`update:Type`, cur.type)
          emit(`update:Keys`, cur.keys)
          emit(`update:Grops`, cur.grops)
        },
        {
          deep: true,
        }
      )
      return {
        ...CONTAINER,
        TreeNode,
        FormListRef,
        addFrom,
        addGroup,
        // changeData,
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
