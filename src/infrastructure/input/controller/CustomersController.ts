import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersUseCase } from '../../../application/use-cases/CustomersUseCase';
import { Customer } from '../../../domain/entity/Customer';

export class CustomersController {
  constructor(private useCase: CustomersUseCase) {}

  async findByFilter(event: APIGatewayProxyEvent) {
    if (!event.queryStringParameters?.name) {
      return this.apiResponseBadRequestError();
    }
    const { name } = event.queryStringParameters;
    if (!name.match(/[a-zA-Z]/)) {
      return this.apiResponseBadRequestError();
    }

    return this.apiResponseOk(
      await this.useCase.findByFilter(new Customer({ name }))
    );
  }

  apiResponseBadRequestError() {
    return {
      statusCode: 400,
      isBase64Encoded: false,
    };
  }

  apiResponseOk(customers: Customer[]) {
    return {
      statusCode: 200,
      isBase64Encoded: false,
      body: JSON.stringify(customers),
    };
  }
}
