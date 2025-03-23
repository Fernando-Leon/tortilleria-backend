export class CreatePermissionDto {
  profileId: number;
  featureId: number;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}
