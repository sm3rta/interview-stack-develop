import axios from "axios";
import { Order, OrderData, Product } from "../components/interfaces";

const INPIPELINE_URL = "http://localhost:5001/api/orders/inpipeline";

const getInPipelineData = async () => {
  const orderData: OrderData = {
    Queued: [],
    InProgress: [],
    QA: [],
  };
  let errorOccurred = false;
  try {
    const response = await axios.get(INPIPELINE_URL);
    if (response?.status === 200) {
      const { data } = response.data;
      data.forEach((order: Order) => {
        orderData[order.OrderStatus as keyof OrderData].push(order);
      });
    } else {
      const { message } = response.data;
      throw message;
    }
  } catch (err) {
    console.error(err);
    errorOccurred = true;
  }
  return { orderData, errorOccurred };
};

const UPDATE_STATUS_URL = "http://localhost:5001/api/orders/update_status";

const updateOrderStatus = async (order: Order, newOrderStatus: string) => {
  const updatedOrder = { ...order, OrderStatus: newOrderStatus };
  let orderStatusUpdated = false;
  try {
    const response = await axios.post(UPDATE_STATUS_URL, updatedOrder);
    if (response?.status === 200) orderStatusUpdated = true;
    else {
      const { message } = response.data;
      throw message;
    }
  } catch (err) {
    console.error(err);
  }
  return orderStatusUpdated;
};

const GET_ACTIVE_PRODUCTS_URL = "http://localhost:5002/api/products/all";

const getActiveProducts = async () => {
  let activeProducts: Product[] = [];
  let errorOccurred = false;
  try {
    const response = await axios.get(GET_ACTIVE_PRODUCTS_URL, {
      params: { status: "Active" },
    });

    if (response?.status === 200) {
      const { data } = response.data;
      activeProducts = data;
    } else {
      const { message } = response.data;
      throw message;
    }
  } catch (err) {
    console.error(err);
    errorOccurred = true;
  }
  return { activeProducts, errorOccurred };
};

export {
  GET_ACTIVE_PRODUCTS_URL,
  INPIPELINE_URL,
  UPDATE_STATUS_URL,
  getActiveProducts,
  getInPipelineData,
  updateOrderStatus,
};
