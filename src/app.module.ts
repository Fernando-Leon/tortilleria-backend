import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "db/data-source";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PermissionModule } from './permission/permission.module';
import { FeatureModule } from './feature/feature.module';
import { ProviderModule } from './provider/provider.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    ProfileModule,
    PermissionModule,
    FeatureModule,
    ProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
