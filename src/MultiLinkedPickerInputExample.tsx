import React, { useCallback, useState } from 'react';
// @ts-ignore
import { ReactComponent as DelIcon } from '@epam/assets/icons/common/action-delete-18.svg';
// @ts-ignore
import { ReactComponent as AddIcon } from '@epam/assets/icons/common/action-add-18.svg';
import { Button, FlexRow, PickerInput, FlexCell } from '@epam/promo';
import { useArrayDataSource } from '@epam/uui-core';
import { languageLevels } from './Data';

const fullLevelsList = languageLevels;

export default function LanguagesMultiPicker() {
    const [pickerValueMap, setPickerValueMap] = useState(new Map<string, number>());

    const FilteredPickerInput = useCallback(
        ({ pickerName }) => {
            const [currentPickerValue, setCurrentPickerValue] = useState(
                pickerValueMap.get(pickerName)
            );

            const filteredLanguageLevelsDataSource = useArrayDataSource(
                {
                    items: fullLevelsList.filter((item) => {
                        return !pickerValueMap.has(pickerName) || pickerValueMap.get(pickerName) === item.id;
                    }),
                },
                [pickerValueMap]
            );

            return (
                <PickerInput
                    dataSource={filteredLanguageLevelsDataSource}
                    value={currentPickerValue}
                    onValueChange={(value: number) => {
                        setCurrentPickerValue(value);
                        setPickerValueMap(new Map([...pickerValueMap.entries(), [pickerName, value]]));
                    }}
                    getName={(item) => item.level}
                    entityName="Language level"
                    selectionMode="single"
                    valueType="id"
                    sorting={{ field: 'level', direction: 'asc' }}
                />
            );
        },
        [pickerValueMap]
    );

    const addNewRow = useCallback(() => {
        setPickerValueMap(new Map([...pickerValueMap, [`picker${pickerValueMap.size}`, undefined]]));
    }, [pickerValueMap]);

    const removeRow = useCallback(() => {
        const mapCopy = new Map(pickerValueMap);
        mapCopy.delete([...mapCopy.keys()].pop());
        setPickerValueMap(mapCopy);
    }, [pickerValueMap]);

    return (
        <FlexCell width={612}>
            {[...pickerValueMap.keys()].map((pickerName) => (
                <FlexRow key={pickerName} spacing="12">
                    <FilteredPickerInput pickerName={pickerName} />
                </FlexRow>
            ))}
            <FlexRow spacing="12">
                <Button icon={AddIcon} fill="light" color="blue" caption="Add row" onClick={addNewRow} />
                <Button
                    icon={DelIcon}
                    fill="light"
                    color="blue"
                    caption="Remove row"
                    isDisabled={pickerValueMap.size <= 1}
                    onClick={removeRow}
                />
            </FlexRow>
        </FlexCell>
    );
}