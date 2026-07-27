export class DepartmentMapper {
  static toResponse(department: any) {
    return {
      id: department.DepartmentId,
      name: department.DepartmentName,
      manager: department.ManagerName,
      location: department.LocationName,
    };
  }

  static toResponseList(items: any[]) {
    return items.map((item) => this.toResponse(item));
  }
}
