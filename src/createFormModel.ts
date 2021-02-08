import { observable } from 'mobx';
import {
  ModelPropertiesDeclaration,
  TypeOfValue,
  types,
} from 'mobx-state-tree';
import { FormEvent } from 'react';
import { getValidators } from './getValidators';

export function createFormModel<P extends ModelPropertiesDeclaration = {}>(
  modelName: string,
  properties: P,
  options: any
) {
  return types
    .model(modelName, properties)
    .volatile(() => ({
      submitting: observable.box(false),
      touched: observable.object<any>({}),
    }))
    .views(self => ({
      get isSubmitting() {
        return self.submitting.get();
      },

      get errors() {
        const errors: any = {};
        const validators = getValidators();

        for (const fieldName in options.validation) {
          let fieldValidation = options.validation[fieldName];
          if (fieldValidation === 'valid') {
            if (self[fieldName] && Array.isArray(self[fieldName])) {
              // @ts-ignore
              self[fieldName].forEach((instance: TypeOfValue<typeof self>) => {
                // @ts-ignore
                if (instance.errors && Object.keys(instance.errors).length > 0)
                  if (!errors[fieldName]) {
                    // @ts-ignore
                    errors[fieldName] = JSON.stringify(instance.errors);
                  } else {
                    // @ts-ignore
                    errors[fieldName] += JSON.stringify(instance.errors);
                  }
              });
            } else if (
              self[fieldName] &&
              // @ts-ignore
              self[fieldName].errors &&
              // @ts-ignore
              Object.keys(self[fieldName].errors).length > 0
            ) {
              // @ts-ignore
              errors[fieldName] = JSON.stringify(self[fieldName].errors);
            }
            continue;
          }

          if (typeof fieldValidation === 'string') {
            fieldValidation = [fieldValidation];
          }

          let errorMessage: string = '';
          if (typeof fieldValidation === 'function') {
            errorMessage = fieldValidation(self[fieldName]);
          } else if (Array.isArray(fieldValidation)) {
            fieldValidation.forEach((validatorName: string) => {
              if (validators[validatorName]) {
                const validation = validators[validatorName](self[fieldName]);
                if (!validation.valid) {
                  errorMessage += validation.message;
                }
              }
            });
          }

          if (errorMessage) {
            errors[fieldName] = errorMessage;
          }
        }
        return errors;
      },

      get isValid() {
        let errors = self.errors;
        if (Object.keys(errors).length === 0) return true;
        return false;
      },
    }))
    .actions(self => ({
      handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (Object.keys(self.errors).length === 0) {
          self.submitting.set(true);
          // @ts-ignore
          self.onSubmit();
        } else {
          // @ts-ignore
          self.setAllTouched();
        }
      },

      setAllTouched() {
        for (const fieldName in options.validation) {
          if (options.validation[fieldName] === 'valid') {
            if (self[fieldName] && Array.isArray(self[fieldName])) {
              // @ts-ignore
              self[fieldName].forEach((instance: any) => {
                instance.setAllTouched();
              });
            } else if (self[fieldName]) {
              // @ts-ignore
              self[fieldName].setAllTouched();
            }
          } else {
            self.touched[fieldName] = true;
          }
        }
      },

      setSubmitting(submitting: boolean) {
        self.submitting.set(submitting);
      },

      handleChange(e: React.ChangeEvent<any>) {
        // @ts-ignore
        self.setValue(e.target.name, e.target.value);
      },

      handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        self.touched[e.target.name] = true;
      },

      setValue(name: string, value: any) {
        // @ts-ignore
        self[name] = value;
      },
    }));
}
