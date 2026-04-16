import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersController } from '../CustomersController';
import { CustomersUseCase } from '../../../../application/use-cases/CustomersUseCase';

describe('CustomersController', () => {
  describe('findByFilter', () => {
    it('should return customers', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
            },
          ])
        ),
      } as unknown as CustomersUseCase;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          name: 'A',
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: '[{"id":"customerId","name":"name","lastName":"lastName","email":"email"}]',
      });
      expect(service.findByFilter).toBeCalledWith({
        name: 'A',
      });
    });

    it('should return 400 when name is invalid', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(),
      } as unknown as CustomersUseCase;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          name: '11',
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 400,
        isBase64Encoded: false,
      });
      expect(service.findByFilter).not.toBeCalled();
    });

    it('should return 400 when name not present', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(),
      } as unknown as CustomersUseCase;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {},
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 400,
        isBase64Encoded: false,
      });
      expect(service.findByFilter).not.toBeCalled();
    });
  });
});
