import {ButtonProps} from "./Types.ts";

export function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick}>
      {props.children}
    </button>
  );
}
