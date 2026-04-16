import axios from 'axios';
import { Customer } from '../../../domain/entity/Customer';
import { CustomersRepository } from '../../../domain/repository/CustomersRepository';
import { RandomUser } from '../dtos/Customers';

export class CustomersRepositoryImpl implements CustomersRepository {
  async findByFilter(customer: Customer, take?: number): Promise<Customer[]> {
    const result = await axios.get(
      `https://randomuser.me/api/?results=${take || 100}`
    );
    if (!result.data.results) {
      return [];
    }

    return result.data.results
      .filter((item: RandomUser) =>
        item.name.first.toLowerCase().startsWith(customer.name.toLowerCase())
      )
      .map(
        (item: RandomUser) =>
          new Customer({
            id: item.id.value,
            name: item.name.first,
            lastName: item.name.last,
            phoneNumber: item.phone,
          })
      );
  }
}
