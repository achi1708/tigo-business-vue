<script setup>
import H3Title from "./H3Title.vue";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { reactive, ref } from "vue";
import SignUpSrv from "../services/SignUpSrv";
import CodeSrv from "../services/CodeSrv";
import { useRouter } from "vue-router";

const props = defineProps(["userId"]);
const form = reactive({
  codigo: "",
});
let errorReq = ref("");

const router = useRouter();

extend("required", {
  ...required,
  message: "Por favor ingresa tu {_field_}",
});
console.log(props.userId);

async function onFormSubmit() {
  const formData = new FormData();
  formData.append("codigo", form.codigo);

  const res = await SignUpSrv.setCode(props.userId, formData);
  if (res.status == "Ok" && res.data) {
    const res2 = await CodeSrv.checkCodeOut(form.codigo);
    if (res2.status == "Ok" && res2.data) {
      let result = "fail";
      if (res2.data.length) {
        result = "success";
      }

      router.replace({
        name: "result",
        params: { res: result },
      });
    } else {
      errorReq.value = res.message;
    }
  } else {
    errorReq.value = res.message;
  }
}
</script>
<template>
  <div id="form-content">
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form method="post" @submit.prevent="handleSubmit(onFormSubmit)">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <input type="text" name="codigo" v-model="form.codigo" />
          <small class="form-error">{{ errors[0] }}</small>
        </ValidationProvider>
        <small v-if="errorReq" class="form-error">{{ errorReq }}</small>
        <H3Title elemh="h5">¿Eres el ganador del premio?</H3Title>
        <button
          :disabled="invalid"
          class="blue-btn"
          type="submit"
          name="enviar"
        >
          Click Aquí
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>
