import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './entities/feature.entity';

@Injectable()
export class FeatureService {
  constructor(@InjectRepository(Feature) private featureRepository: Repository<Feature>) {}

  create(createFeatureDto: CreateFeatureDto) {
    return this.featureRepository.save(createFeatureDto);
  }

  findAll() {
    return this.featureRepository.find();
  }

  findOne(id: number) {
    return this.featureRepository.findOne({ where: { id } });
  }

  update(id: number, updateFeatureDto: UpdateFeatureDto) {
    return this.featureRepository.update(id, updateFeatureDto);
  }

  remove(id: number) {
    return this.featureRepository.delete(id);
  }
}
