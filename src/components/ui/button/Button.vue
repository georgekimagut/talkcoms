<script setup>
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";
import { buttonVariants } from ".";
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    required: false,
    default: "default",
    validator: (value) =>
      [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
        "dark", // New variant
        "light", // New variant
      ].includes(value),
  },
  size: { type: null, required: false },
  class: { type: null, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: [String, Object, Function], required: false, default: "button" },
  // New props for dark/light buttons
  buttonLink: { type: String, required: false },
  buttonText: { type: String, required: false },
});

// Extend the button variants with custom classes
const extendedVariants = computed(() => {
  const baseClasses = buttonVariants({
    variant: props.variant,
    size: props.size,
  });

  if (props.variant === "dark") {
    return cn(
      baseClasses,
      "rounded-full relative overflow-hidden h-fit w-fit bg-default btn-dark ",
      "flex justify-center py-[13px] px-[20px] cursor-pointer z-1 hover:pr-[45px] text-white ",
      props.class
    );
  }

  if (props.variant === "light") {
    return cn(
      baseClasses,
      "rounded-full relative overflow-hidden h-fit w-fit bg-transparent btn-light ",
      "flex justify-center py-[13px] px-[20px] cursor-pointer z-1 hover:pr-[45px] border border-[#82bc00] text-secondary",
      props.class
    );
  }
  if (props.variant === "square") {
    return cn(
      baseClasses,
      "relative overflow-hidden p-3 bg-secondary text-white cursor-pointer group button-square-fill"
    );
  }

  return cn(baseClasses, props.class);
});

// Determine the text color based on variant
const textColor = computed(() => {
  return props.variant === "dark" ? "text-white" : "text-secondary";
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="extendedVariants">
    <template v-if="variant === 'dark' || variant === 'light'">
      <router-link
        v-if="buttonLink"
        :to="buttonLink"
        class="inline-flex items-center"
        :class="textColor"
      >
        {{ buttonText }}
        <i
          class="fas fa-angle-right icon text-xl absolute opacity-0 inline-block"
          :class="textColor"
        ></i>
      </router-link>
      <slot v-else />
    </template>
    <slot v-else />
  </Primitive>
</template>
