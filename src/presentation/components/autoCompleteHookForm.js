import { Autocomplete } from "@mui/material";
import { Controller } from "react-hook-form";

const AutoCompleteHookForm = ({ options = [], renderInput, getOptionLabel, isOptionEqualToValue, control, defaultValue, name, renderOption, loading}) => {
    return (
        <Controller
            render={({ field: { onChange, value } }) => (
                <Autocomplete
                    onChange={(event, item) => {
                        onChange(item)
                    }}
                    options={options}
                    loading={loading}
                    value={value || null}
                    getOptionLabel={getOptionLabel}
                    renderOption={renderOption}
                    renderInput={renderInput}
                    isOptionEqualToValue={isOptionEqualToValue}
                />
            )}
            defaultValue={defaultValue}
            name={name}
            control={control}
        />
    );
}
export default AutoCompleteHookForm