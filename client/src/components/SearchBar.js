import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDebounce } from "../hooks";

export const SearchBar = ({ onGet: getTasks}) => {
    const [searchString, setSearchString] = useState(null);

    const handleChange = ({ target }) => setSearchString(target.value);
    
    useDebounce(() => {
        if (searchString !== null) { // avoid searching tasks in the first render
            getTasks(searchString);
        }
    }, 500, [searchString]);

    return (
        <InputGroup>
            <Form.Control className="border-primary" type="text" placeholder="Search your tasks" value={searchString || ""} onChange={handleChange} />
        </InputGroup>
    );
};