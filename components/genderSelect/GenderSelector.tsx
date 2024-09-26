// GenderSelector.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GetAllUsersWithGender } from '@/utils/apis';
import { useBearStore } from '@/zustand/store';
import { DropDownPicker } from '../DropDownPicker/dropDownPicker';

const GenderSelector = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const { updateListOfUser } = useBearStore();

  const onPress = async () => {
    try {
      if (selectedValue) {
        const response = await GetAllUsersWithGender(selectedValue);
        updateListOfUser(response ?? []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Select Gender</Text>
      <DropDownPicker
        selectedValue={selectedValue}
        onSelect={(value: string) => setSelectedValue(value)}
        mode={'dialog'}
        data={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Both', value: 'both' },
        ]}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          marginHorizontal: 10,
          borderRadius: 10,
          marginTop: 10,
          backgroundColor: 'red',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: 'white' }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderSelector;
