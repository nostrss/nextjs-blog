import React, { useState } from 'react';

export default function useInput(initialInputValue: any) {
  const [inputValue, setInputValue] = useState(initialInputValue);

  const onChangeUseInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value.trim(),
    });
  };

  return { inputValue, onChangeUseInput };
}
