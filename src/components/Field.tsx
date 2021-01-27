import React, { InputHTMLAttributes, ReactChildren, useContext } from 'react';
import { FormContext } from './MSTForm';
import { observer } from 'mobx-react-lite';

type PropType = {
  name: string;
  component?: React.ComponentClass<any> | string;
  children?: ReactChildren;
} & InputHTMLAttributes<any>;

const Field = observer((props: PropType) => {
  const { name, component, children, ...rest } = props;

  const formInstance: any = useContext(FormContext);
  if (!formInstance) {
    throw new Error('Form instance prop is required in MstForm');
  }

  const FieldComponent = component ? component : 'input';
  const style = { display: 'block' };

  return React.createElement(
    FieldComponent,
    {
      name: name,
      value: formInstance[name],
      onChange: formInstance.handleChange,
      onBlur: formInstance.handleBlur,
      style: style,
      ...rest,
    },
    children
  );
});

export default Field;
