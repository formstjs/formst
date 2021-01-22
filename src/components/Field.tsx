import React, { InputHTMLAttributes, ReactChildren, useContext } from 'react';
import { FormContext } from './MstForm';
import { observer } from 'mobx-react-lite';

type PropType = {
  name: string;
  component?: any;
  children?: ReactChildren;
} & InputHTMLAttributes<any>;

const Field = observer((props: PropType) => {
  const { name, component, children, ...rest } = props;

  const formInstance: any = useContext(FormContext);
  if (!formInstance) {
    throw new Error('Form instance prop is required in MstForm');
  }

  const FieldComponent = component ? component : 'input';

  return React.createElement(
    FieldComponent,
    {
      name: name,
      value: formInstance[name],
      onChange: formInstance.handleChange,
      onBlur: formInstance.handleBlur,
      ...rest,
    },
    children
  );
});

export default Field;
