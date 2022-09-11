<script setup>
import TheLayout from "./../components/TheLayout.vue";
import H3Title from "../components/H3Title.vue";
import UserCodeForm from "../components/UserCodeForm.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<template>
  <TheLayout class="user-code-layout">
    <div>
      <div id="title-page">
        <H3Title elemh="h2">Ingresa tu código</H3Title>
        <hr />
      </div>
      <UserCodeForm :userId="route.params.userId" />
    </div>
    <div id="footer-form">
      <img src="@/assets/tigo-business-logo.png" alt="Tigo Business" />
    </div>
  </TheLayout>
</template>
