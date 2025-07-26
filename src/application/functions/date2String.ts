export class DateString extends Date {
    private padStart(value: number): string {
    return `${value}`.padStart(2, "0")
  }
    toString(): string {
    const day = this.padStart(this.getDay())
    const month = this.padStart(this.getMonth())
    const year = this.getFullYear()
    return `${day}/${month}/${year}`
  }
}

const d = new DateString()