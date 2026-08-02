export class OracleFilterBuilder {
  /**
   * Build Oracle REST API equality filter
   *
   * Example:
   * DepartmentName = IT
   *
   * Result:
   * DepartmentName='IT'
   */
  static equals(field: string, value: string): string {
    const escapedValue = value.replace(/'/g, "''");

    return `${field}='${escapedValue}'`;
  }

  /**
   * Build contains filter
   *
   * Example:
   * DisplayName contains John
   *
   * Result:
   * DisplayName LIKE '%John%'
   */
  static contains(field: string, value: string): string {
    const escapedValue = value.replace(/'/g, "''");

    return `${field} LIKE '%${escapedValue}%'`;
  }

  /**
   * Build multiple filters
   *
   * Example:
   * [
   *  "DepartmentName='IT'",
   *  "ActiveFlag='Y'"
   * ]
   *
   * Result:
   * DepartmentName='IT' AND ActiveFlag='Y'
   */
  static and(filters: string[]): string {
    return filters.join(' AND ');
  }
}
