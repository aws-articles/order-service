import {OrderController} from "../../src/controller/OrderController";
import {HttpStatus} from "../../src/model/Response";
import {OrderService} from "../../src/service/OrderService";
import {Order} from "../../src/model/Order";
import {orderRequest} from "../fixture/OrderRequestFixture";

import * as sinon from "sinon";

test("should return Ok as the response status given a request to find an order by id", async () => {
    sinon.stub(OrderService.prototype, "findAnOrderBy").callsFake(() => sinon.mock(Order));

    const response = await new OrderController().handle(orderRequest("id-100", "/orders/id-100"));

    expect(response.status).toEqual(HttpStatus.OK);
});

test("should return Not Found as the response status given no order exists for the order by id", async () => {
    sinon.stub(OrderService.prototype, "findAnOrderBy").callsFake(() => null);

    const response = await new OrderController().handle(orderRequest("id-100", "/orders/id-100"));

    expect(response.status).toEqual(HttpStatus.NOT_FOUND);
});

test("should return Not Found as the response status given a request is not for find an order by id", async () => {
    const response = await new OrderController().handle(orderRequest("id-100", "/test/id-100"));

    expect(response.status).toEqual(HttpStatus.NOT_FOUND);
});

test("should return an order given a request to find an order by id", async () => {
    sinon.stub(OrderService.prototype, "findAnOrderBy").callsFake(() => new Order("id-100", 1445));

    const response = await new OrderController().handle(orderRequest("id-100"));

    expect(response.body).toEqual(new Order("id-100", 1445));
});

afterEach(() => {
    sinon.restore();
});