import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const SearchBar = () => {
    const [searchString, setSearchString] = useState("");

    const handleChange = ({ target }) => setSearchString(target.value);

    return (
        <InputGroup>
            <Form.Control className="border-primary" type="text" placeholder="Search your tasks" value={searchString} onChange={handleChange} />
        </InputGroup>
    );
};