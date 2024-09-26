import { Picker } from '@react-native-picker/picker';
import React from 'react';

export const DropDownPicker = (props: any) => {
    let { onSelect, data, selectedValue, mode } = props

    return <Picker
        mode={mode}
        selectedValue={selectedValue}
        onValueChange={(itemValue) =>
            onSelect(itemValue)
        }>
        {data.map((val: { label: string | undefined; value: unknown; }, index: React.Key | null | undefined) => {
            return <Picker.Item label={val.label} value={val.value} key={index} />

        })}
    </Picker>
}