import React, { ReactChildren, useContext } from 'react';
import { FormContext } from './MstForm';

type PropType = {
  component?: string;
  children?: ReactChildren;
  type: string;
  name: string;
};

export default function Field(props: PropType) {
  const formInstance = useContext(FormContext);
  if (!formInstance) {
    throw new Error('Form instance prop is required in MstForm');
  }
  const FieldComponent = props.component ? props.component : 'input';

  return React.createElement(
    FieldComponent,
    {
      ...props,
      value: formInstance[name],
      // @ts-ignore
      onChange: formInstance.handleChange,
      // @ts-ignore
      onBlur: formInstance.handleBlur,
    },
    props.children
  );
}
