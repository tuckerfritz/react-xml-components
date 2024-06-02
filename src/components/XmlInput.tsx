import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
} from "react";
import NodeContext from "../contexts/Node.context";

type XmlInputFieldProps = {} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const XmlInput = forwardRef<HTMLInputElement, XmlInputFieldProps>(
  (props, inputRef) => {
    const { currentNode, level } = useContext(NodeContext);

    const onChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
          props.onChange(event);
        }
        if (currentNode) currentNode.textContent = event.target.value;
      },
      [currentNode]
    );

    return (
      <input
        {...props}
        ref={inputRef}
        className={
          props.className ? `rxml__input ${props.className}` : "rxml__input"
        }
        onChange={onChange}
        defaultValue={currentNode?.textContent ?? undefined}
        data-level={level}
      />
    );
  }
);

XmlInput.displayName = "XmlInput";

export default XmlInput;
