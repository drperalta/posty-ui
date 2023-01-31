import axios from "@/common/utils/axios";
import { ENDPOINTS } from "@/common/constants/endpoints";
import { IUser, IUserUpdatePayload } from "@/common/interface/IUser";

export const useUserServer = () => {
  const meService = async (): Promise<IUser> => {
    const response = await axios.get(ENDPOINTS.USER.ME);

    return response.data;
  };

  const searchService = async (name: string): Promise<IUser[]> => {
    const response = await axios.get(`${ENDPOINTS.USER.SEARCH}/${name}`);

    return response.data;
  };

  const getService = async (id: string): Promise<IUser> => {
    const response = await axios.get(`${ENDPOINTS.USER.GET}/${id}`);

    return response.data;
  };

  const updateService = async (id: string, payload: IUserUpdatePayload) => {
    const response = await axios.patch(
      `${ENDPOINTS.USER.UPDATE}/${id}`,
      payload
    );

    return response.data;
  };

  return {
    meService,
    searchService,
    getService,
    updateService,
  };
};
