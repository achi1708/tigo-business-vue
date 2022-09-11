<script setup>
import { RouterLink } from "vue-router";
import TheLayout from "../components/TheLayout.vue";
import H3Title from "../components/H3Title.vue";
</script>

<template>
  <TheLayout class="start-layout">
    <div class="full-width" id="start-title">
      <img alt="Un paso adelante del futuro" src="@/assets/home-title.png" />
    </div>
    <div class="full-width" id="start-call-to-action">
      <H3Title elemh="h3" class="regular-m">!Descubre si eres el</H3Title>
      <H3Title elemh="h3" class="bold-m"
        >afortunado ganador<br />de este gran premio!</H3Title
      >
      <RouterLink to="/signup" class="blue-btn">Quiero participar</RouterLink>
    </div>
  </TheLayout>
</template>
