import { CustomersUseCaseImpl } from '../CustomersUseCaseImpl';
import { Customer } from '../../../domain/entity/Customer';
import { CustomersRepository } from '../../../domain/repository/CustomersRepository';

describe('CustomersUseCaseImpl', () => {
  describe('findByFilter', () => {
    it('should return customers', async () => {
      // Prepare
      const repository = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              phoneNumber: '011-962-7516',
            },
          ])
        ),
      } as unknown as CustomersRepository;

      const service = new CustomersUseCaseImpl(repository);

      // Execute
      const response = await service.findByFilter(new Customer({ name: 'A' }));

      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'nlastName@ihfintech.com.pe',
          phoneNumber: '011-962-7516',
        },
      ]);
      expect(repository.findByFilter).toBeCalledWith({
        name: 'A',
      });
    });
  });
});
