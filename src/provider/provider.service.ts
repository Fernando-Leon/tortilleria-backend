import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProviderService {
  constructor(@InjectRepository(Provider) private providerRepository: Repository<Provider>) {}

  create(createProviderDto: CreateProviderDto) {  
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return this.providerRepository.find();
  }

  findOne(id: number) {
    return this.providerRepository.findOne({ where: { id } });
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return this.providerRepository.update(id, updateProviderDto);
  }

  remove(id: number) {
    return this.providerRepository.delete(id);
  }
}
