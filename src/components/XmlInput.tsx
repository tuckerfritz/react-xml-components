import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
} from "react";
import NodeContext from "../contexts/Node.context";

type XmlInputFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const XmlInput = forwardRef<HTMLInputElement, XmlInputFieldProps>(
  ({ className, onChange, ...rest }, inputRef) => {
    const { currentNode, level } = useContext(NodeContext);

    const handleOnChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(event);
        }
        if (currentNode) currentNode.textContent = event.target.value;
      },
      [currentNode, onChange],
    );

    return (
      <input
        {...rest}
        ref={inputRef}
        className={className ? `rxml__input ${className}` : "rxml__input"}
        onChange={handleOnChange}
        defaultValue={currentNode?.textContent ?? undefined}
        data-level={level}
      />
    );
  },
);

XmlInput.displayName = "XmlInput";

export default XmlInput;
