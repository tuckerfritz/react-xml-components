import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
} from "react";
import NodeContext from "../contexts/Node.context";

type XmlInputFieldProps = {} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement>

const XmlInput = forwardRef<HTMLInputElement, XmlInputFieldProps>(
  (props, inputRef) => {
    const { xmlDoc, currentNodePath: ancestorNodePath, level } = useContext(NodeContext);

    const node = useMemo(() => {
      const text = xmlDoc.evaluate(
        ancestorNodePath ?? "",
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
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
          props.onChange(event);
        }
        node.textContent = event.target.value;
      },
      [node]
    );

    return (
      <input
        {...props}
        ref={inputRef}
        className={props.className ? `rxml__input ${props.className}` : "rxml__input"}
        onChange={onChange}
        defaultValue={node.textContent ?? undefined}
        data-level={level}
      />
    );
  }
);

XmlInput.displayName = "XmlInput";

export default XmlInput;
