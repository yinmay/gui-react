import { IFormValue } from './form';

interface IFormRule {
  key: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: { name: string; validator: (value: string) => Promise<void> };
}

type IFormRules = IFormRule[];

interface IFormErrors {
  [K: string]: string[];
}

const isEmpty = (value: any) => {
  return value === undefined || value === null || value === '';
};

export const noError = (errors: object[]) => {
  return Object.keys(errors).length === 0;
};

function flatten<T>(array: Array<T | T[]>) {
  const result: T[] = [];
  return result;
}

const validator = (formValue: IFormValue, rules: IFormRules): any => {
  // tslint:disable-next-line: prefer-const
  let errors: any = {};
  const addError = (key: string, message: string | Promise<any>) => {
    if (errors[key] === undefined) {
      errors[key] = [];
    }
    errors[key].push(message);
  };

  rules.map((rule) => {
    const value = formValue[rule.key];
    if (rule.validate) {
      // 自定义
      const promise = rule.validate.validator(value);
      addError(rule.key, promise);
    }
    if (rule.required && isEmpty(value)) {
      addError(rule.key, `${rule.key} is required`);
    }
    if (!isEmpty(value) && rule.minLength && value.length < rule.minLength) {
      addError(rule.key, `${rule.key} is too short`);
    }
    if (!isEmpty(value) && rule.maxLength && value.length > rule.maxLength) {
      addError(rule.key, `${rule.key} is too long`);
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      addError(rule.key, `${rule.key} is not right`);
    }
  });
  return errors;
};

export { validator };
