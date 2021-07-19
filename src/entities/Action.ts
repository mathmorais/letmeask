import React from "react";
type SVGIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export class Action {
  name!: string;
  icon!: SVGIcon;
  label?: string;
  prevValue?: boolean;
}

export class ActionBuilder {
  action: Action = this.reset();

  constructor() {
    this.reset();
  }

  private reset() {
    this.action = new Action();
    return this.action;
  }

  setName(name: string) {
    this.action.name = name;

    return this;
  }

  setLabel(label: string) {
    this.action.label = label;

    return this;
  }

  setIcon(icon: SVGIcon) {
    this.action.icon = icon;

    return this;
  }

  setPrevValue(value: boolean) {
    this.action.prevValue = value;

    return this;
  }

  getAction(): Action {
    const results = { ...this.action };
    this.reset();
    return results;
  }
}
