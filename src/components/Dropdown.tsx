import { Dispatch, SetStateAction } from 'react';

/**
 * Dropdown Component
 * 
 * This page displays a simple dropdown that shows the passed in string array elements as select options.
 */
interface DropdownProps {
    title: string;
    options: string[];
    selectedIndex: number;
    setSelectedIndex: Dispatch<SetStateAction<number>>;
}

const Dropdown = ({
    title,
    options,
    selectedIndex,
    setSelectedIndex
}: DropdownProps) => {
    const handleChange = (item: number) => {
        setSelectedIndex(item)
    };

    return (
        <>
            {title}
            <div>
                <select defaultValue={options[selectedIndex]}>
                    {/* <option value="none">None</option> */}
                    {options.map((item, index) => (
                        <option
                            key={index}
                            value={item}
                            onClick={() => handleChange(index)}
                        >
                            {item}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default Dropdown;