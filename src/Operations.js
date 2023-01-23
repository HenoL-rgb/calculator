export class AddCommand {
  constructor(valueToAdd) {
    this.valueToAdd = Number(valueToAdd);
  }

  execute(currentValue) {
    return currentValue + this.valueToAdd;
  }
}

export class SubstractComman {
  constructor(valueToSub) {
    this.valueToSub = valueToSub;
  }

  execute(currentValue) {
    return currentValue - this.valueToSub;
  }
}
