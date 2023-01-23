export class Calculator {
  constructor(value) {
    this.value = value;
  }

  execute(command) {
    this.command = command;
    return command.execute(this.value);
  }

  undo() {
    return this.command && this.command.undo();
  }
}

export class AddCommand {
  constructor(state) {
    this.valueToAdd = state.firstValue;
  }

  execute(currentValue) {
    this.currentValue = currentValue;
    return currentValue + this.valueToAdd;
  }

  undo() {
    return this.currentValue && this.currentValue - this.valueToAdd;
  }
}
