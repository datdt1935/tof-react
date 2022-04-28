import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';

import { Autocomplete } from '../../material-ui';
import { find } from 'lodash';
import { useSelector } from 'react-redux';
import { isDarkThemeMode } from 'utils/localstorage';
import { useLayoutStyle } from 'utils/theme.util';
<<<<<<< Updated upstream:src/components/table/control/select.component.tsx
import { RootState } from 'store/reducer';
=======
>>>>>>> Stashed changes:src/shared/table/control/select.component.tsx

enum OptionEnum {
  TEXT = 'textValue',
  VALUE = 'idValue',
}

const TableControlAutocomplete: React.FC<any> = ({
  value: initialValue,
  row: { index },
  column: { id, width },

  onDataChanged, // This is a custom function that we supplied to our table instance,
  className,
}) => {
  const isDarkMode = isDarkThemeMode();
  const styleDarkMode = useLayoutStyle();
  const [value, setValue] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const optionData = useSelector(
    (state: RootState) => state.dataReducer.comboBoxOption[id]
  );
  useEffect(() => {
    if (!initialValue) {
      setInputValue('');
      setValue(null);
      return;
    }

    const selectedId = initialValue[OptionEnum.VALUE] || initialValue;
    const item = find(
      optionData,
      // eslint-disable-next-line
      (_o: any) => _o[OptionEnum.VALUE] == selectedId
    );
    setValue(item || null);
    setInputValue((item ? item[OptionEnum.TEXT] : '') || '');
  }, [initialValue, optionData]);
  return (
    <Autocomplete
      options={optionData || []}
      className={className || ''}
      getOptionLabel={(option) => option[OptionEnum.TEXT] || ''}
      getOptionSelected={(option, value) =>
        option[OptionEnum.TEXT] === value[OptionEnum.TEXT]
      }
      value={value}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
        onDataChanged(index, id, newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            size="small"
            margin="dense"
            variant={isDarkMode ? 'outlined' : 'outlined'}
            className={styleDarkMode.formControlRoot}
            InputProps={{
              ...params.InputProps,
              classes: {
                notchedOutline: styleDarkMode.notchedOutline,
              },
            }}
          />
        );
      }}
    />
  );
};

TableControlAutocomplete.defaultProps = {
  onDataChanged: () => undefined,
};

export default TableControlAutocomplete;
