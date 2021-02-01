import React, { ReactChild } from 'react';

type PropType = {
  children: ReactChild | Array<ReactChild>;
  formInstance: any;
};

export const FormContext = React.createContext(null);

export default function Formst(props: PropType) {
  return (
    <FormContext.Provider value={props.formInstance}>
      {props.children}
    </FormContext.Provider>
  );
}
