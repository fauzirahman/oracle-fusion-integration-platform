export class OracleQueryBuilder {
  private readonly params = new URLSearchParams();
  private readonly filters: string[] = [];

  /**
   * onlyData=true
   */
  onlyData(): this {
    this.params.set('onlyData', 'true');
    return this;
  }

  /**
   * limit=25
   */
  limit(limit: number): this {
    this.params.set('limit', String(limit));
    return this;
  }

  /**
   * offset=0
   */
  offset(offset: number): this {
    this.params.set('offset', String(offset));
    return this;
  }

  /**
   * fields=PersonNumber,DisplayName
   */
  fields(...fields: string[]): this {
    if (fields.length > 0) {
      this.params.set('fields', fields.join(','));
    }

    return this;
  }

  /**
   * expand=assignments,managers
   */
  expand(...expand: string[]): this {
    if (expand.length > 0) {
      this.params.set('expand', expand.join(','));
    }

    return this;
  }

  /**
   * q=PersonNumber='100001'
   */
  where(field: string, value: string | number): this {
    this.filters.push(`${field}='${value}'`);
    return this;
  }

  /**
   * orderBy=DisplayName
   */
  orderBy(field: string): this {
    this.params.set('orderBy', field);
    return this;
  }

  /**
   * finder=findByPersonNumber;PersonNumber=100001
   */
  finder(value: string): this {
    this.params.set('finder', value);
    return this;
  }

  /**
   * totalResults=true
   */
  totalResults(enabled = true): this {
    this.params.set('totalResults', String(enabled));
    return this;
  }

  /**
   * Generate query string
   */
  build(): string {
    if (this.filters.length > 0) {
      this.params.set('q', this.filters.join(';'));
    }

    const query = this.params.toString();

    return query ? `?${query}` : '';
  }
}