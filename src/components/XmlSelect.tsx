import {
  DetailedHTMLProps,
  SelectHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
} from "react";
import NodeContext from "../contexts/Node.context";

type XmlSelectProps = {} & DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const XmlSelect = forwardRef<HTMLSelectElement, XmlSelectProps>(
  (props, selectRef) => {
    const { xmlDoc, currentNodePath: parentNodePath, level } = useContext(NodeContext);

    const currentNode = useMemo(() => {
      const text = xmlDoc.evaluate(
        parentNodePath,
        xmlDoc.getRootNode(),
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE
      );
      if (text.singleNodeValue === null) {
        throw Error(`Text Node Not Found`);
      }
      return text.singleNodeValue;
    }, [xmlDoc]);

    const onChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (props.onChange) {
          props.onChange(event);
        }
        currentNode.textContent = event.target.value;
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
        defaultValue={currentNode.textContent ?? undefined}
      >
        {props.children}
      </select>
    );
  }
);

XmlSelect.displayName = "XmlSelect";

export default XmlSelect;
