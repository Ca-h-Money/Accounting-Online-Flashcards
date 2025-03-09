import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";

/**
 * Represents the objects that the Dropdown component accepts as props.
 * @type {Object} DropdownProps
 * @property {string} id - The id of the dropdown, used to differentiate between different dropdowns.
 * @property {string} title - The header of the dropdown component, typically the instructions.
 * @property {string[]} options - The array of options to be displayed in the dropdown menu.
 * @property {number} selectedIndex - The starting element index to display in the dropdown menu.
 * @property {Dispatch<SetStateAction<number>>} setSelectedIndex - The parent component's "set state"
 *          method for handling option selection.
 * @property {string} ariaLabel - The label for what the dropdown component is being used for.
 */
type DropdownProps = {
    id: string;
    title: string;
    options: string[];
    selectedIndex: number;
    setSelectedIndex: Dispatch<SetStateAction<number>>;
    ariaLabel: string;
}

/**
 * Dropdown Component
 * 
 * This component displays a header and a dropdown that shows the passed in string
 * array elements as selectable options.
 *
 * Props:
 * @param {DropdownProps} - The dropdown title, options, selected option,
 *                          and set selected option method.
 */
const Dropdown = ({
    id,
    title,
    options,
    selectedIndex,
    setSelectedIndex,
    ariaLabel
}: DropdownProps) => {
    // State to control whether the dropdown menu is open or not.
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Update the index of the selected topic and close the dropdown menu
    const handleSelection = (item: number) => {
        setSelectedIndex(item);
        setIsOpen(false);
    };

    // Hold a reference to the dropdown menu
    const dropdownRef = useRef<HTMLDivElement>(null);

    // If the user clicks outside of the dropdown menu, close the menu.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        // Dropdown component container
        <div id={id + "-component"} className="relative p-5 max-w-sm mx-auto">
            <h2 className="p-4 text-lg font-semibold">{title}</h2>
            {/* The dropdown element */}
            <div id={id} ref={dropdownRef} className="relative inline-block w-64">
                <button
                    aria-label={`Toggle ${ariaLabel} dropdown`}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {options[selectedIndex]}
                    <span className="ml-2">▼</span>
                </button>
                {/* The dropdown menu */}
                {isOpen && (
                    <div aria-label={`${ariaLabel} dropdown menu`}>
                        <ul role="menu" className="absolute left-0 mt-1 w-full bg-white text-gray-900 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-100">
                            {options.map((option, index) => (
                                <li
                                    key={option}
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                    onClick={() => { handleSelection(index) }}
                                    >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dropdown;