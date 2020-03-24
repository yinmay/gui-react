import React, { ReactFragment } from 'react';
import { Input } from '../Input/index';
import { getScpoedClass } from '../scopedClass';
import './form.scss';

const scpoedClass = getScpoedClass('gui-form');
export interface IFormValue {
  [k: string]: any;
}

interface IProps {
  value: IFormValue;
  fields: Array<{ name: string; label: string; input: { type: string } }>;
  buttons: ReactFragment;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: (value: IFormValue) => void;
  errors: { [k: string]: string[] };
  className?: string;
}

export const Form = (props: IProps) => {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    props.onSubmit(e);
  };
  const onInputChange = (name: string, value: string) => {
    const newFormValue = { ...props.value, [name]: value };
    props.onChange(newFormValue);
  };
  const { className } = props;
  return (
    <form onSubmit={onSubmit}>
      <table>
        {props.fields.map((f) => {
          const name = f && f.name;
          return (
            <tr className={scpoedClass('row', { extra: className })} key={name}>
              <td>{f.label}</td>
              <td>
                <Input
                  type={f.input.type}
                  value={props.value[name]}
                  onChange={(e) => onInputChange(name, e.target.value)}
                />
                <div>{props.errors[name]}</div>
              </td>
            </tr>
          );
        })}
        <div>{props.buttons}</div>
      </table>
    </form>
  );
};
