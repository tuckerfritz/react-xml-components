import {
  DetailedHTMLProps,
  SelectHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
} from "react";
import XmlEditorContext from "../contexts/XmlEditor.context";
import NodeContext from "../contexts/Node.context";
import LevelContext from "../contexts/Level.context";

type XmlSelectProps = {} & DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const XmlSelect = forwardRef<HTMLSelectElement, XmlSelectProps>(
  (props, selectRef) => {
    const xmlDoc = useContext(XmlEditorContext);
    const { ancestorNodePath } = useContext(NodeContext);
    const level = useContext(LevelContext);

    const node = useMemo(() => {
      const text = xmlDoc.evaluate(
        ancestorNodePath,
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
        node.textContent = event.target.value;
      },
      [node]
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
        defaultValue={node.textContent ?? undefined}
      >
        {props.children}
      </select>
    );
  }
);

XmlSelect.displayName = "XmlSelect";

export default XmlSelect;
