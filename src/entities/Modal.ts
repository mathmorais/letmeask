export class Modal {
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  onAccept: () => void;

  constructor(props: Modal) {
    this.icon = props.icon;
    this.title = props.title;
    this.description = props.description;
    this.onAccept = props.onAccept;
  }
}
