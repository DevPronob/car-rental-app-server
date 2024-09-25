import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps = {
    label: string;
    name: string;
    options: { value: string; label: string; disabled?: boolean }[] | undefined;
    disabled?: boolean;
    mode?: 'multiple' | undefined;
    onValueChange: React.Dispatch<React.SetStateAction<string>>;
    defaultValue?: { value: string; label: string; disabled?: boolean }[] | undefined;
};
function InputFieldWithWatch({
    label,
    name,
    options,
    mode,
    onValueChange,
    defaultValue
}: TPHSelectProps) {
    const method = useFormContext();
    const inputValue = useWatch({
        control: method.control,
        name,
    });

    useEffect(() => {
        onValueChange(inputValue);
    }, [inputValue]);
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <Select
                        mode={mode}
                        defaultValue={defaultValue}
                        style={{ width: '100%' }}
                        {...field}
                        options={options}
                        size="large"
                    />
                    {error && <small style={{ color: 'red' }}>{error.message}</small>}
                </Form.Item>
            )}
        />
    );
}

export default InputFieldWithWatch;