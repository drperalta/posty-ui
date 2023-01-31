<script setup lang="ts">
import { toRaw } from "vue";
import { FormInstance, ElForm, ElFormItem, ElInput } from "element-plus";
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
      <el-form ref="formRef" :model="form" :rules="formRules">
        <div class="grid grid-cols-2 gap-4">
          <!-- First Name -->
          <el-form-item prop="first_name">
            <el-input
              placeholder="First Name"
              v-model="form.first_name"
              size="large"
            />
          </el-form-item>

          <!-- Last Name -->
          <el-form-item prop="last_name">
            <el-input
              placeholder="Last Name"
              v-model="form.last_name"
              size="large"
            />
          </el-form-item>
        </div>

        <!-- Email -->
        <el-form-item prop="email">
          <el-input placeholder="Email" v-model="form.email" size="large" />
        </el-form-item>

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
            :show-password="true"
          />
        </el-form-item>

        <el-form-item class="mt-6">
          <el-button
            class="w-full"
            type="primary"
            size="large"
            @click="submitForm(formRef)"
          >
            Submit
          </el-button>
        </el-form-item>
      </el-form>

      <el-button type="text" size="large" @click="onSignup"
        >Already have an account? Login</el-button
      >
    </div>
  </main>
</template>
