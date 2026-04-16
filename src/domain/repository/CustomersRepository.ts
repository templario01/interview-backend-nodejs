import { Customer } from '../entity/Customer';

export interface CustomersRepository {
  findByFilter(customer: Customer, take?: number): Promise<Customer[]>;
}
