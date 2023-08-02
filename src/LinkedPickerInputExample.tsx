import React, { useState } from 'react';
import { FlexRow, PickerInput, FlexCell } from '@epam/promo';
import { useArrayDataSource } from '@epam/uui-core';
import { languageLevels } from './Data'

const fullLevelsList = languageLevels;

export default function LanguagesMultiPicker() {
    const fullLanguageLevelsDataSource = useArrayDataSource({ items : fullLevelsList }, []);

    const [selectedItems, setSelectedItems] = useState([]);
    const filteredLanguageLevelsDataSource = useArrayDataSource(
        {
            items : fullLevelsList.filter(
                (item) => !selectedItems?.includes(item.id)
            )
        },
        [selectedItems]
    );

    const [singlePickerValue, singleOnValueChange] = useState(null);
    const [multiPickerValue, multiOnValueChange] = useState(null);

    // @ts-ignore
    return (
        <FlexCell width={ 612 }>
            <FlexRow spacing="12">
                <PickerInput
                    dataSource={ fullLanguageLevelsDataSource }
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
                    dataSource={ filteredLanguageLevelsDataSource }
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
