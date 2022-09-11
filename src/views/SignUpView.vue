<script setup>
import TheLayout from "../components/TheLayout.vue";
import H3Title from "../components/H3Title.vue";
import SignupForm from "../components/SignupForm.vue";
</script>
<template>
  <TheLayout class="signup-layout">
    <div id="intro-form">
      <H3Title elemh="h3"
        >Si vas a ser el gran ganador<br />de este premio, necesitamos
        <br />conocerte.</H3Title
      >
    </div>
    <SignupForm />
  </TheLayout>
</template>
