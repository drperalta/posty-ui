<script setup lang="ts">
import { toRaw } from "vue";
import { FormInstance, ElForm, ElFormItem, ElInput } from "element-plus";
import { ILoginForm } from "@/common/interface/IAuth";
import { useForm } from "@/common/helpers/useForm";
import router from "@/common/router";
import { LoginFormRules } from "@/common/rules/auth";

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
    <div class="w-[360px] p-4 rounded-xl text-center">
      <h1 class="text-3xl font-bold text-center mb-8">Login</h1>

      <!-- Form -->
      <el-form ref="formRef" :model="form" :rules="formRules">
        <!-- Username -->
        <el-form-item prop="username">
          <el-input
            placeholder="Username"
            v-model="form.username"
            size="large"
          />
        </el-form-item>

        <!-- Password -->
        <el-form-item prop="password">
          <el-input
            placeholder="Password"
            v-model="form.password"
            type="password"
            size="large"
          />
        </el-form-item>

        <el-form-item class="mt-6">
          <el-button
            class="w-full"
            type="primary"
            size="large"
            @click="submitForm(formRef)"
          >
            Login
          </el-button>
        </el-form-item>
      </el-form>

      <el-button type="text" size="large" @click="onSignup"
        >Don't have an account? Sign up</el-button
      >
    </div>
  </main>
</template>
