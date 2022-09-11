<script>
export default {
  props: ["elemh"],
  setup(props, { attrs }) {
    console.log(props.elemh);
    console.log(attrs);
    return { attrs };
  },
};
</script>
<template>
  <h1 :class="attrs.class" v-if="elemh === 'h1'">
    <slot></slot>
  </h1>
  <h2 :class="attrs.class" v-if="elemh === 'h2'">
    <slot></slot>
  </h2>
  <h3 :class="attrs.class" v-if="elemh === 'h3'">
    <slot></slot>
  </h3>
  <h4 :class="attrs.class" v-if="elemh === 'h4'">
    <slot></slot>
  </h4>
  <h5 :class="attrs.class" v-if="elemh === 'h5'">
    <slot></slot>
  </h5>
  <h6 :class="attrs.class" v-if="elemh === 'h6'">
    <slot></slot>
  </h6>
</template>
