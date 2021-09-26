<template>
  <a-button type="primary" @click="getForm" style="cursor: pointer; margin-bottom: 20px">
    submit（点击拿到表单树形数据）
  </a-button>
  <ConditionsRoom ref="ConditionsRef" />
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import ConditionsRoom from '@/components/conditions/index.vue'
  export default defineComponent({
    components: { ConditionsRoom },
    setup() {
      const ConditionsRef = ref()
      const getForm = () => {
        const res = ConditionsRef.value.resolveTreeForm()
        console.log('🚀 ~ file: App.vue ~ line 18 ~ getForm ~ res', res)
      }
      return {
        ConditionsRef,
        getForm,
      }
    },
  })
</script>
