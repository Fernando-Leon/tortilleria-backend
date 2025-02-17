import { Controller, Get } from "@nestjs/common";
import { SexsService } from "./sexs.service";

@Controller("sexs")
export class SexsController {
  constructor(private readonly sexsService: SexsService) {}

  @Get()
  findAll() {
    return this.sexsService.findAll();
  }
}
