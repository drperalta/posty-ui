<script setup lang="ts">
import { toRaw } from "vue";
import { FormInstance } from "element-plus";
import { ISignupForm } from "@/common/interface/IAuth";
import { useForm } from "@/common/helpers/useForm";
import router from "@/common/router";
import { SignupFormRules } from "@/common/rules/auth";

const { form, formRef, formRules } = useForm<ISignupForm>({
  defaultValues: {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  },
  rules: SignupFormRules,
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
  router.push({ name: "Login" });
};
</script>

<template>
  <main class="flex justify-center items-center h-screen">
    <div class="w-[400px] p-4 rounded-xl text-center">
      <h1 class="text-3xl font-bold text-center mb-8">Sign in</h1>

      <!-- Form -->
      <ElForm ref="formRef" :model="form" :rules="formRules">
        <div class="grid grid-cols-2 gap-4">
          <!-- First Name -->
          <ElFormItem prop="first_name">
            <ElInput
              placeholder="First Name"
              v-model="form.first_name"
              size="large"
            />
          </ElFormItem>

          <!-- Last Name -->
          <ElFormItem prop="last_name">
            <ElInput
              placeholder="Last Name"
              v-model="form.last_name"
              size="large"
            />
          </ElFormItem>
        </div>

        <!-- Email -->
        <ElFormItem prop="email">
          <ElInput placeholder="Email" v-model="form.email" size="large" />
        </ElFormItem>

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
            :show-password="true"
          />
        </ElFormItem>

        <ElFormItem class="mt-6">
          <el-button
            class="w-full"
            type="primary"
            size="large"
            @click="submitForm(formRef)"
          >
            Submit
          </el-button>
        </ElFormItem>
      </ElForm>

      <el-button link size="large" @click="onSignup"
        >Already have an account? Login</el-button
      >
    </div>
  </main>
</template>
