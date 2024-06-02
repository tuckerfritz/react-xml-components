import {
  DetailedHTMLProps,
  SelectHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
} from "react";
import NodeContext from "../contexts/Node.context";

type XmlSelectProps = {} & DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const XmlSelect = forwardRef<HTMLSelectElement, XmlSelectProps>(
  (props, selectRef) => {
    const { currentNode, level } = useContext(NodeContext);

    const onChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (props.onChange) {
          props.onChange(event);
        }
        if (currentNode) currentNode.textContent = event.target.value;
      },
      [currentNode]
    );

    return (
      <select
        {...props}
        ref={selectRef}
        className={
          props.className ? `rxml__select ${props.className}` : "rxml__select"
        }
        onChange={onChange}
        data-level={level}
        defaultValue={currentNode?.textContent ?? undefined}
      >
        {props.children}
      </select>
    );
  }
);

XmlSelect.displayName = "XmlSelect";

export default XmlSelect;
