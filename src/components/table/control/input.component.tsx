import React, { useEffect, useRef, useState } from 'react';
import { Input, Typography } from 'components/material-ui';

const TableControlEditable: React.FC<any> = ({
  value: initialValue,
  row: { index },
  column: { id, width },
  onDataChanged, // This is a custom function that we supplied to our table instance
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef(index);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    onDataChanged(index, id, value);
    setIsEditing(false);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  if (!isEditing) {
    let styleTypo: any = {};

    if (!value) {
      styleTypo = {
        ...styleTypo,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
    }
    return (
      <Typography
        style={styleTypo}
        color="primary"
        noWrap
        variant="subtitle2"
        onDoubleClick={() => setIsEditing(true)}
      >
        {value}
      </Typography>
    );
  }

  return (
    <Input
      disableUnderline
      fullWidth
      inputRef={inputRef}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
  );
};

TableControlEditable.defaultProps = {
  onDataChanged: () => undefined,
};

export default TableControlEditable;
