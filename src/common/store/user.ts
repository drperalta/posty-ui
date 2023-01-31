import { defineStore } from "pinia";
import { ref } from "vue";
import { IUser } from "../interface/IUser";
import { useUserService } from "./../service/user";

const { meService, searchService } = useUserService();

export const useUserStore = defineStore("user", () => {
  const data = ref<IUser>();
  const loading = ref<boolean>(false);
  const error = ref<unknown>();

  const getUserDetails = async () => {
    loading.value = true;

    try {
      const response = await meService();
      data.value = response;
      loading.value = false;
    } catch (err) {
      error.value = err;
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    getUserDetails,
  };
});

export const useUserSearchStore = defineStore("user-search", () => {
  const data = ref<IUser[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<unknown>();

  const searchUser = async (name: string) => {
    loading.value = true;

    try {
      const response = await searchService(name);
      data.value = response;
      loading.value = false;
    } catch (err) {
      error.value = err;
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    searchUser,
  };
});
