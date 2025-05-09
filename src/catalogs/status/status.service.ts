import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Status } from "./status.entity";

@Injectable()
export class StatusService {
  constructor(@InjectRepository(Status) private sexRepository: Repository<Status>) {}

  findAll() {
    return this.sexRepository.find();
  }
}