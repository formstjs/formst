import { observable } from 'mobx';
import {
  IModelType,
  // Instance,
  // isArrayType,
  ModelPropertiesDeclaration,
  ModelPropertiesDeclarationToProperties,
  // TypeOfValue,
  types,
} from 'mobx-state-tree';
import { ChangeEvent, FormEvent, SyntheticEvent } from 'react';
import { getValidators } from './getValidators';

export function createFormModel<P extends ModelPropertiesDeclaration = {}>(
  modelName: string,
  properties: P,
  options: any
): IModelType<ModelPropertiesDeclarationToProperties<P>, {}> {
  return types.model(modelName, properties).extend(self => {
    const isSubmitting = observable.box(false);
    const touched: any = observable.object({});
    return {
      views: {
        get isSubmitting() {
          return isSubmitting.get();
        },
        get errors() {
          const errors: any = {};
          const validators = getValidators();

          for (const fieldName in options.validation) {
            let fieldValidation = options.validation[fieldName];
            if (fieldValidation === 'valid') {
              // @ts-ignore
              if (self[fieldName] && Array.isArray(self[fieldName])) {
                // @ts-ignore
                self[fieldName].forEach(instance => {
                  // TODO: if instance of FormModel
                  if (
                    instance.errors &&
                    Object.keys(instance.errors).length > 0
                  )
                    if (!errors[fieldName]) {
                      errors[fieldName] = JSON.stringify(instance.errors);
                    } else {
                      errors[fieldName] += JSON.stringify(instance.errors);
                    }
                });
              } else if (self[fieldName]) {
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

            // const errorMessage = fieldValidation(self[fieldName]);
            if (errorMessage) {
              errors[fieldName] = errorMessage;
            }
          }
          return errors;
        },
        get touched() {
          return touched;
        },
        get isValid() {
          let errors = self.errors;
          if (Object.keys(errors).length === 0) return true;
          return false;
        },
      },
      actions: {
        handleSubmit(e: FormEvent) {
          e.preventDefault();
          if (Object.keys(self.errors).length === 0) {
            isSubmitting.set(true);
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
              // @ts-ignore
              if (self[fieldName] && Array.isArray(self[fieldName])) {
                // @ts-ignore
                self[fieldName].forEach(instance => {
                  instance.setAllTouched();
                });
              } else if (self[fieldName]) {
                // @ts-ignore
                self[fieldName].setAllTouched();
              }
            } else {
              // @ts-ignore
              touched[fieldName] = true;
            }
          }
        },
        setSubmitting(submitting: boolean) {
          isSubmitting.set(submitting);
        },
        handleChange(e: ChangeEvent<any>) {
          // @ts-ignore
          self[e.target.name] = e.target.value;
          if (!self.touched[e.target.name]) {
            // @ts-ignore
            self.touched[e.target.name] = true;
          }
        },
        handleBlur(e: SyntheticEvent) {
          // @ts-ignore
          touched[e.target.name] = true;
        },
      },
    };
  });
}
