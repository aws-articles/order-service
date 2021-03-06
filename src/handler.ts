import {APIGatewayEvent} from "aws-lambda";
import {OrderRequest}    from "./model/OrderRequest";
import {OrderController} from "./controller/OrderController";

export const ordersHandler = async (event: APIGatewayEvent): Promise<any> => {
    const response = await new OrderController().handle(new OrderRequest(event));
    return response.get();
};