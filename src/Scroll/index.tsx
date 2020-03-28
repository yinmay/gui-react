import React, { ReactNode } from 'react';
import { Scroll } from './scroll';
import './index.scss';
import { getScpoedClass } from '../scopedClass';

const scpoedClass = getScpoedClass('gui-scroll');

interface IProps {
  //   type: string;
  children?: ReactNode;
  className?: string;
}

export const ScrollExample = (props: IProps) => {
  const { className, ...rest } = props;
  return (
    <Scroll style={{ height: 400, border: '1px solid red' }}>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>14</div>
      <div>15</div>
      <div>16</div>
      <div>17</div>
      <div>18</div>
      <div>19</div>
      <div>11</div>
      <div>12</div>
    </Scroll>
  );
};
