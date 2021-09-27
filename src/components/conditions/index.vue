<template>
  <div style="width: 100%" v-for="(v, i) in treeList" :key="i">
    <Conditions
      :selects="selects"
      v-model:Type="v.type"
      v-model:Keys="v.keys"
      v-model:Grops="v.grops"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, shallowRef, onBeforeMount, toRaw, reactive } from 'vue'
  import Conditions from './components/ConditionsTreeNode.vue'
  import Ctrl from './controller/Ctrl'
  import { Selected } from './interface'
  import { cloneDeep } from 'lodash'

  export default defineComponent({
    name: 'ConditionsContainer',
    components: { Conditions },
    setup() {
      const CTRL = new Ctrl()
      const selects = shallowRef<Selected[]>([])
      const treeList = reactive([CTRL.getTreeModel()])
      const getContidions = async () => {
        selects.value = await CTRL.getConditions()
      }
      onBeforeMount(getContidions)
      const resolveTreeForm = () => cloneDeep(toRaw(treeList))
      return { selects, treeList, resolveTreeForm }
    },
  })
</script>

<style lang="less" scoped></style>
