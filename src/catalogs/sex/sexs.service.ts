import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sex } from "./sex.entity";

@Injectable()
export class SexsService {
  constructor(@InjectRepository(Sex) private sexRepository: Repository<Sex>) {}

  findAll() {
    return this.sexRepository.find();
  }
}
