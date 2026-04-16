import { CustomersUseCase } from '../application/use-cases/CustomersUseCase';
import { Customer } from '../domain/entity/Customer';
import { CustomersRepository } from '../domain/repository/CustomersRepository';

export class CustomersUseCaseImpl implements CustomersUseCase {
  constructor(private repository: CustomersRepository) {}

  async findByFilter(customer: Customer): Promise<Customer[]> {
    return (await this.repository.findByFilter(customer)).map(
      (item) =>
        new Customer({
          ...item,
          email: `${item.name.charAt(0)}${item.lastName}@ihfintech.com.pe`,
        })
    );
  }
}
