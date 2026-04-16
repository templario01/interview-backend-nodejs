import { Customer } from '../../domain/entity/Customer';

export interface CustomersUseCase {
  findByFilter(customer: Customer): Promise<Customer[]>;
}
