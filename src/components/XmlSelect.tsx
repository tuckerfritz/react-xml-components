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

    const textNodePath = `${ancestorNodePath}`;

    const textNode = useMemo(() => {
      const text = xmlDoc.evaluate(
        textNodePath,
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
        textNode.textContent = event.target.value;
      },
      [textNode]
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
        defaultValue={textNode.textContent ?? undefined}
      >
        {props.children}
      </select>
    );
  }
);

export default XmlSelect;
