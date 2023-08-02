import React, { useState } from 'react';
import { FlexRow, PickerInput, FlexCell } from '@epam/promo';
import {ArrayDataSource, useArrayDataSource} from '@epam/uui-core';
import { languageLevels } from './Data'

const fullLevelsList = languageLevels;

export default function LanguagesMultiPicker() {
    const [pickerValueMap, setPickerValueMap] = useState(
        new Map<string, number>()
    );

    function FilteredPickerInput(props) {
        const { pickerName, pickerValueMap } = props;
        const [currentPickerValue, setCurrentPickerValue] = useState(pickerValueMap.get(pickerName));
        const filteredLanguageLevelsDataSource = useArrayDataSource(
            {
                items: fullLevelsList.filter(
                        (item) => {
                            const selected = new Set(pickerValueMap.values());
                            console.log("currentPickerValue:", currentPickerValue, "item.id", item.id, !selected.has(item.id), item.id === currentPickerValue);
                            // const b = !selected.has(item.id) && item.id !== currentPickerValue;
                            const b = !selected.has(item.id) || item.id === currentPickerValue;
                            return b;
                        }
                    )
            },
            [pickerValueMap]
        );

        console.log("-pickerName: ", pickerName);
        console.log(" pickerValue:", pickerValueMap.get(pickerName));
        console.log(" currentPickerValue:", currentPickerValue);
        console.log(" Level:", fullLevelsList.find( (item) => currentPickerValue === item.id)?.level);
        console.log(" filteredLanguageLevelsDataSource:", filteredLanguageLevelsDataSource.props);
        console.log("-----");

        return (
            <PickerInput
                dataSource={filteredLanguageLevelsDataSource}
                value={currentPickerValue}
                onValueChange={(value: number) => {
                    // setPickerValueMap(pickerValueMap.set(pickerName, value));
                    setCurrentPickerValue(value)
                    setPickerValueMap(new Map([...pickerValueMap.entries(), [pickerName, value]]));
                }}
                getName={ (item) => item.level }
                entityName="Language level"
                selectionMode="single"
                valueType="id"
                sorting={ { field: 'level', direction: 'asc' } }
            />
        );
    }
    const pickerCount = 3;
    const pickerArray = Array.from(Array(pickerCount), (_, i) => {
        const pickerName = `picker${i}`;
        // console.log("pickerName: ", pickerName, "pickerValue:", pickerValueMap.get(pickerName))
        return (
            <FlexRow spacing="12">
                <FilteredPickerInput
                    key={pickerName}
                    pickerName={pickerName}
                    pickerValueMap={pickerValueMap}
                    setPickerValueMap={setPickerValueMap}
                />
            </FlexRow>
        );
    });

    // @ts-ignore
    return (
        <FlexCell width={ 612 }>
            { pickerArray }
        </FlexCell>
    );
}
