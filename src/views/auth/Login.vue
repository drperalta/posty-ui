<script setup lang="ts">
import { toRaw } from "vue";
import { FormInstance } from "element-plus";
import { ILoginForm } from "@/common/interface/IAuth";
import { useForm } from "@/common/helpers/useForm";
import { LoginFormRules } from "@/common/rules/auth";
import router from "@/common/router";

const { form, formRef, formRules } = useForm<ILoginForm>({
  defaultValues: {
    password: "",
    username: "",
  },
  rules: LoginFormRules,
});

const submitForm = async (formInstance?: FormInstance) => {
  if (!formInstance) return;

  await formInstance.validate((valid, errorFields) => {
    if (valid) {
      console.log("fields", toRaw(form));
      return;
    }

    console.log("error", errorFields);
  });
};

const resetForm = (formInstance?: FormInstance) => {};

const onSignup = () => {
  router.push({ name: "Signup" });
};
</script>

<template>
  <main class="flex justify-center items-center h-screen">
    <div class="w-[360px] p-2 rounded-xl text-center">
      <h1 class="text-3xl font-bold text-center mb-8">Login</h1>

      <!-- Form -->
      <ElForm ref="formRef" :model="form" :rules="formRules">
        <!-- Username -->
        <ElFormItem prop="username">
          <ElInput
            placeholder="Username"
            v-model="form.username"
            size="large"
          />
        </ElFormItem>

        <!-- Password -->
        <ElFormItem prop="password">
          <ElInput
            placeholder="Password"
            v-model="form.password"
            type="password"
            size="large"
          />
        </ElFormItem>

        <ElFormItem class="mt-6">
          <ElButton
            class="w-full"
            type="primary"
            size="large"
            @click="submitForm(formRef)"
          >
            Login
          </ElButton>
        </ElFormItem>
      </ElForm>

      <ElButton link size="large" @click="onSignup"
        >Don't have an account? Sign up</ElButton
      >
    </div>
  </main>
</template>
