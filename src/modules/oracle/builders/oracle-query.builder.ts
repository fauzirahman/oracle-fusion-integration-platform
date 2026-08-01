export class OracleQueryBuilder {
  private readonly params = new URLSearchParams();

  /**
   * onlyData=true
   */
  onlyData(enabled = true): this {
    this.params.set('onlyData', String(enabled));
    return this;
  }

  /**
   * limit
   */
  limit(limit: number): this {
    this.params.set('limit', String(limit));
    return this;
  }

  /**
   * offset
   */
  offset(offset: number): this {
    this.params.set('offset', String(offset));
    return this;
  }

  /**
   * q=
   */
  where(expression: string): this {
    this.params.set('q', expression);
    return this;
  }

  /**
   * fields=a,b,c
   */
  fields(...fields: string[]): this {
    if (fields.length > 0) {
      this.params.set('fields', fields.join(','));
    }

    return this;
  }

  /**
   * expand=child1,child2
   */
  expand(...resources: string[]): this {
    if (resources.length > 0) {
      this.params.set('expand', resources.join(','));
    }

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
   * totalResults=true
   */
  totalResults(enabled = true): this {
    this.params.set('totalResults', String(enabled));
    return this;
  }

  /**
   * links=self,canonical
   */
  links(...links: string[]): this {
    if (links.length > 0) {
      this.params.set('links', links.join(','));
    }

    return this;
  }

  /**
   * arbitrary query parameter
   */
  parameter(name: string, value: string | number | boolean): this {
    this.params.set(name, String(value));
    return this;
  }

  /**
   * Build query string.
   */
  build(): string {
    const query = this.params.toString();

    if (!query) {
      return '';
    }

    return `?${query}`;
  }
}
