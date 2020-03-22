interface IProps {
  extra: string | undefined;
}
interface IClassToggles {
  [K: string]: boolean; // key全都是字符串，value是bool的任何对象
}

const getScpoedClass = (prefix?: string) => {
  return (name: string | IClassToggles, options?: IProps) => {
    const nameInObj = name instanceof Object ? name : { [name]: name };
    const scoped = Object.entries(nameInObj)
      .filter((k: any) => k[1] !== false)
      .map((j: any) => j[0])
      .map((i: any) => [prefix, i].filter(Boolean).join('-'))
      .concat((options && options.extra) || [])
      .join(' ');

    return scoped;
  };
};

export { getScpoedClass };
