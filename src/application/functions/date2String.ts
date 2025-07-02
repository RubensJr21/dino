export class DateString extends Date {
  // eslint-disable-next-line jsdoc/require-jsdoc
  private padStart(value: number): string {
    return `${value}`.padStart(2, "0")
  }
  // eslint-disable-next-line jsdoc/require-jsdoc
  toString(): string {
    const day = this.padStart(this.getDay())
    const month = this.padStart(this.getMonth())
    const year = this.getFullYear()
    return `${day}/${month}/${year}`
  }
}

const d = new DateString()