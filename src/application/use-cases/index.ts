import { CustomersServiceImpl } from './CustomersUseCaseImpl';
import { repository } from '../../infrastructure/output/repository';

export const service = new CustomersServiceImpl(repository);
