<script setup>
import { useRoute } from "vue-router";
import TheLayout from "../components/TheLayout.vue";

const route = useRoute();
const resRoute = route.params.res;
</script>
<template>
  <TheLayout class="result-layout" :class="[resRoute]">
    <h1>Result</h1>
  </TheLayout>
</template>
