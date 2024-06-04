import {
  DetailedHTMLProps,
  SelectHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
} from "react";
import { NodeContext } from "@src/contexts/Node.context";

type XMLSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const XMLSelect = forwardRef<HTMLSelectElement, XMLSelectProps>(
  ({ className, onChange, children, ...rest }, selectRef) => {
    const { currentNode, level } = useContext(NodeContext);

    const handleOnChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
          onChange(event);
        }
        if (currentNode) currentNode.textContent = event.target.value;
      },
      [currentNode, onChange],
    );

    return (
      <select
        {...rest}
        ref={selectRef}
        className={className ? `rxml__select ${className}` : "rxml__select"}
        onChange={handleOnChange}
        data-level={level}
        defaultValue={currentNode?.textContent ?? undefined}
      >
        {children}
      </select>
    );
  },
);

XMLSelect.displayName = "XmlSelect";

export default XMLSelect;
