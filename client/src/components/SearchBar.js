import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDebounce } from "../hooks";
import { useTasksContext } from "../contexts";

export const SearchBar = () => {
    const [searchString, setSearchString] = useState(null);
    const { getTasks } = useTasksContext();

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