import axios from "@/common/utils/axios";
import { ENDPOINTS } from "@/common/constants/endpoints";
import { IUser, IUserUpdatePayload } from "@/common/interface/IUser";

export const useUserService = () => {
  /**
   * Get currently logged in user details
   * @returns user details
   */
  const meService = async (): Promise<IUser> => {
    const response = await axios.get(ENDPOINTS.USER.ME);

    return response.data;
  };

  /**
   * Search user by name
   * @param name user name
   * @returns array of users
   */
  const searchService = async (name: string): Promise<IUser[]> => {
    const response = await axios.get(`${ENDPOINTS.USER.SEARCH}/${name}`);

    return response.data;
  };

  /**
   * Get user details by id
   * @param id user id
   * @returns user details
   */
  const getService = async (id: string): Promise<IUser> => {
    const response = await axios.get(`${ENDPOINTS.USER.GET}/${id}`);

    return response.data;
  };

  /**
   * Update user details
   * @param id user id
   * @param payload user details to update
   * @returns updated user details
   */
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
