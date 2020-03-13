import {HttpStatus, Response} from "../../src/model/Response";

it("should return an object with body and status code", () => {
    const model = {
        "article": "Serverless"
    };
    const response = Response.ok(HttpStatus.OK, model);
    expect(response.get()).toEqual({
        "statusCode": HttpStatus.OK,
        "body": "{\"article\":\"Serverless\"}"
    })
});

it("should return an object with only status code", () => {
    const response = Response.ok(HttpStatus.OK);
    expect(response.get()).toEqual({
        "statusCode": HttpStatus.OK
    })
});