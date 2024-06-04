import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
} from "react";
import { NodeContext } from "@src/contexts/Node.context";

type XMLInputFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const XMLInput = forwardRef<HTMLInputElement, XMLInputFieldProps>(
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

XMLInput.displayName = "XmlInput";

export default XMLInput;
