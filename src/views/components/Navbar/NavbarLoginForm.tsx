import { Alert, Button, Dropdown, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
const bcrypt = require("bcryptjs");

const saltRounds = 10;

function NavbarLoginForm() {
    //Os três estados abaixo são para o Alerta do formulário
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const [variant, setVariant] = useState("success");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function verifyLogin(user_email: String, user_password: String): Promise<Number> {
        try {
            const res = await axios({
                method: "get",
                url: "http://localhost:3001/users/login/:login",
                params: { email: user_email, password: user_password },
            });
            console.log(res);
            if (res.status === 204) return 0;
            else if (res.status === 201) return 1;
            else return 2;
        } catch (error) {
            console.log(error);
            return 3;
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const user_email = email;
        const user_password = password;

        const resLogin = await verifyLogin(user_email, user_password);

        setVariant("danger");
        setShow(true);
        if (resLogin === 0) {
            setText("Login com sucesso");
            setVariant("success");
        } else if (resLogin === 1) setText("Usuário não encontrado");
        else if (resLogin === 2) setText("Senha incorreta");
        else setText("Erro ao tentar fazer login");
    };

    return (
        <>
            <Dropdown id="login_dropdown">
                <Dropdown.Toggle id="login_dropdown"> Login </Dropdown.Toggle>

                <Dropdown.Menu align={{ lg: "start" }}>
                    <Form className="px-2 py-1" style={{ width: "235px" }} noValidate onSubmit={(e) => handleSubmit(e)}>
                        <Alert show={show} variant={variant}>
                            <p>{text}</p>
                        </Alert>

                        <Form.Group className="mb-3" controlId="login_form_group_email">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="E-mail"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="login_form_group_password">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Senha"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" id="login_form_grid_checkbox_remain_logged">
                            <Form.Check type="checkbox" label="Lembrar" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Entrar
                        </Button>
                    </Form>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

export { NavbarLoginForm };
