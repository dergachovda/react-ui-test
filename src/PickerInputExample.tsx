import React, { useState } from 'react';
import { FlexRow, PickerInput, FlexCell } from '@epam/promo';
import { useArrayDataSource } from '@epam/uui-core';
import { languageLevels } from './Data'

export default function LanguagesMultiPicker() {
    const [singlePickerValue, singleOnValueChange] = useState(null);
    const [multiPickerValue, multiOnValueChange] = useState(null);

    const [selectedItems, setSelectedItems] = useState([]);

    // Create DataSource outside the Picker, by calling useArrayDataSource hook
    const dataSource = useArrayDataSource(
        {
            items: languageLevels,
        },
        [],
    );

    // @ts-ignore
    return (
        <FlexCell width={ 612 }>
            <FlexRow spacing="12">
                <PickerInput
                    dataSource={ dataSource }
                    value={ multiPickerValue }
                    onValueChange={ (newValue) => {
                        setSelectedItems(newValue);
                        multiOnValueChange(newValue);
                    } }
                    getName={ (item) => item.level }
                    entityName="Language level"
                    selectionMode="multi"
                    valueType="id"
                    sorting={ { field: 'level', direction: 'asc' } }
                />
                <PickerInput
                    dataSource={ dataSource }
                    value={ singlePickerValue }
                    onValueChange={ singleOnValueChange }
                    getName={ (item) => item.level }
                    entityName="Language level"
                    selectionMode="single"
                    valueType="id"
                    sorting={ { field: 'level', direction: 'asc' } }
                />
            </FlexRow>
        </FlexCell>
    );
}
