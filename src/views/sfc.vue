<template>Hello</template>
<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue'

onMounted(() => {
  const ins = getCurrentInstance()
  console.log(ins)
})
</script>

<cc lang="chencc">
{
    name:1
}
</cc>
