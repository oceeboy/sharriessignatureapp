import axios from "axios";

const BASE_URL = "https://api.timbu.cloud";
const PRODUCTS_URL = `${BASE_URL}/products`;
const IMAGE_BASE_URL = `${BASE_URL}/images/`;
const organization_id = "54db846ca93b479a9cc67204674621ed";
const Appid = "6BWP9Z2WUC29X6C";
const Apikey = "2482205ddcff4363b4d7d5e8637f1c4920240705193638616942";

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    organization_id,
    Appid,
    Apikey,
  },
});

export const getProducts = async () => {
  try {
    const response = await apiClient.get(PRODUCTS_URL);
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
};

export const getImageUrl = (imagePath) => {
  return `${IMAGE_BASE_URL}${imagePath}`;
};
