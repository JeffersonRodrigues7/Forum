import { Form } from "react-bootstrap";
import { ChangeEventHandler } from "react";
import { FormikErrors } from "formik";

interface Props {
    control_id: string;
    label: string;
    type: string;
    name: string;
    placeholder: string;
    form_text: string;
    handleChange: ChangeEventHandler;
    value: string;
    error: FormikErrors<string> | undefined;
    isInvalid: boolean | undefined;
}

function NavbarFormGroup({ control_id, label, type, name, placeholder, form_text, handleChange, value, error, isInvalid }: Props) {
    return (
        <Form.Group className="mb-3" controlId={control_id}>
            <Form.Label>{label}</Form.Label>
            <Form.Control required type={type} name={name} placeholder={placeholder} onChange={handleChange} value={value} isInvalid={isInvalid} />
            <Form.Text className="text-muted">{form_text}</Form.Text>
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    );
}

export { NavbarFormGroup };
