<script>
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  numeric,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import { reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";
import SignUpSrv from "../services/SignUpSrv";
import H3Title from "./H3Title.vue";

export default {
  setup() {
    const form = reactive({
      name: "",
      lastname: "",
      email: "",
      cellphone: "",
      company: "",
    });
    const router = useRouter();
    let isLoading = ref(false);
    let errorReq = ref("");
    const validationSchema = computed(() => {
      return {
        name: {
          required: helpers.withMessage("Indícanos tu nombre", required),
        },
        lastname: {
          required: helpers.withMessage("Indícanos tu apellido", required),
        },
        email: {
          required: helpers.withMessage(
            "Ingresa tu correo electrónico",
            required
          ),
          email: helpers.withMessage(
            "Ingresa un correo electrónico válido",
            email
          ),
        },
        cellphone: {
          numeric: helpers.withMessage(
            "Ingresa un número de celular válido",
            numeric
          ),
          minLength: helpers.withMessage(
            ({ $params }) =>
              `Ingresa un número de celular válido (${$params.min} digitos)`,
            minLength(10)
          ),
          maxLength: helpers.withMessage(
            ({ $params }) =>
              `Ingresa un número de celular válido (${$params.max} digitos)`,
            maxLength(10)
          ),
        },
      };
    });
    const v$ = useValidate(validationSchema, form);
    async function handleSubmit() {
      if (!(await v$.value.$validate())) return;
      isLoading.value = true;
      errorReq.value = "";
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("lastname", form.lastname);
      formData.append("email", form.email);
      formData.append("cellphone", form.cellphone);
      formData.append("company", form.company);
      const resSignUp = await SignUpSrv.doSignUp(formData);
      if (resSignUp.status == "Ok" && resSignUp.data) {
        const { data } = resSignUp;
        router.replace({
          name: "codeUser",
          params: { userId: data },
        });
        //navigate(`${process.env.REACT_APP_BASE_URL}/code/${res.data}`,{state: { fromApp: true }});
      } else {
        errorReq.value = resSignUp.message;
      }
      isLoading.value = false;
    }
    return {
      form,
      v$,
      isLoading,
      errorReq,
      handleSubmit,
    };
  },
  components: { H3Title },
};
</script>

<template>
  <div id="form-content">
    <H3Title elemh="h6">Registra tus datos<br />para contactarte</H3Title>
    <small v-if="errorReq" class="form-error">{{ errorReq }}</small>
    <form @submit.prevent="handleSubmit" method="post">
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        v-model="form.name"
        @keyup="v$.name.$touch"
        @blur="v$.name.$touch"
        :disabled="isLoading"
      />
      <small v-if="v$.name.$error" class="form-error">{{
        v$.name.$errors[0].$message
      }}</small>
      <input
        type="text"
        name="lastname"
        placeholder="Apellido"
        v-model="form.lastname"
        @keyup="v$.lastname.$touch"
        @blur="v$.lastname.$touch"
        :disabled="isLoading"
      />
      <small v-if="v$.lastname.$error" class="form-error">{{
        v$.lastname.$errors[0].$message
      }}</small>
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        v-model="form.email"
        @keyup="v$.email.$touch"
        @blur="v$.email.$touch"
        :disabled="isLoading"
      />
      <small v-if="v$.email.$error" class="form-error">{{
        v$.email.$errors[0].$message
      }}</small>
      <input
        type="number"
        name="cellphone"
        placeholder="Teléfono"
        v-model.number="form.cellphone"
        @keyup="v$.cellphone.$touch"
        @blur="v$.cellphone.$touch"
        :disabled="isLoading"
      />
      <small v-if="v$.cellphone.$error" class="form-error">{{
        v$.cellphone.$errors[0].$message
      }}</small>
      <input
        type="text"
        name="company"
        placeholder="Empresa"
        v-model="form.company"
        :disabled="isLoading"
      />
      <button :disabled="isLoading" type="submit" name="registrar">
        Registrar
      </button>
    </form>
  </div>
</template>
