<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div :class="cn('py-6 px-4 pt-0', props.class)">
    <slot />
  </div>
</template>
