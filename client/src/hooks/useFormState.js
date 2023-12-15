import { useState } from "react"

export const useFormState = initState => {
    const [formState, setFormState] = useState(initState);
    const [response, setResponse] = useState(null);

    return [formState, setFormState, response, setResponse];
}