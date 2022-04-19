import { Dropdown, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { NavbarFormGroup } from "./NavbarFormGroup";
import axios from "axios";
import { useState } from "react";

const scheme = yup.object().shape({
    user_name: yup
        .string()
        .matches(/^[a-zA-Z]./, "Nome de usuário deve começar com uma letra")
        .min(6, "Nome de usuário deve ter entre 6 a 15 caracteres")
        .max(15, "Nome de usuário deve ter entre 6 a 15 caracteres")
        .required("Campo obrigatório")
        .test(
            "userName único",
            "Este nome de usuário já está em uso", // <- key, message
            function (value) {
                return new Promise((resolve, reject) => {
                    axios
                        .get("http://localhost:3001/users/userName/:userName", {
                            params: {
                                userName: value,
                            },
                        })
                        .then(function (response) {
                            if (response.status === 200) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        });
                });
            }
        ),
    user_email: yup
        .string()
        .email("Email inválido")
        .required("Campo obrigatório")
        .test(
            "E-mail único",
            "Este e-mail já está em uso", // <- key, message
            function (value) {
                return new Promise((resolve, reject) => {
                    axios
                        .get("http://localhost:3001/users/email/:email", {
                            params: {
                                email: value,
                            },
                        })
                        .then(function (response) {
                            if (response.status === 200) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        });
                });
            }
        ),
    user_password: yup
        .string()
        .matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,15}$/, "Senha deve conter entre 8 a 15 caracteres, com pelo menos 1 letra e 1 número")
        .required("Campo obrigatório"),
    user_password_repeat: yup
        .string()
        .oneOf([yup.ref("user_password"), null], "As senhas devem coincidir")
        .required("Campo obrigatório"),
    user_accept_terms: yup.bool().oneOf([true], "É necessário aceitar os termos").required("Campo obrigatório"),
});

function NavbarRegisterForm() {
    const handleSubmit = async (e: any, values: any, resetForm: any) => {
        e.preventDefault();

        /**
         * TRABALHAR COM BCRYPT AQUI
         */

        axios
            .post("http://localhost:3001/users", {
                userName: values.user_name,
                email: values.user_email,
                password: values.user_password,
            })
            .then(function (response) {
                console.log(response);
                //window.location = "/" as (string | Location) & Location;
                /**
                 * Abaixo está a mensagem de confirmação de cadastro
                 */
            })
            .catch(function (error: any) {
                console.log(error);
            });
    };

    return (
        <>
            <Dropdown id="register_dropdown">
                <Dropdown.Toggle id="register_dropdown"> Registrar </Dropdown.Toggle>

                <Dropdown.Menu align={{ lg: "start" }}>
                    <Formik
                        validationSchema={scheme}
                        onSubmit={console.log}
                        initialValues={{
                            user_name: "",
                            user_email: "",
                            user_password: "",
                            user_password_repeat: "",
                            user_accept_terms: false,
                        }}
                    >
                        {({ handleChange, values, errors, isValid, dirty, resetForm, initialValues }) => (
                            <Form id="register_form" className="px-2 py-1" style={{ width: "250px" }} noValidate onSubmit={(e) => handleSubmit(e, values, resetForm)}>
                                <NavbarFormGroup
                                    control_id="register_form_group_user_name"
                                    label="Usuário"
                                    type="user"
                                    name="user_name"
                                    placeholder="Nome de usuário"
                                    form_text="Seu nick deve conter entre 6 a 15 caracteres, começando com uma letra do alfabeto"
                                    handleChange={handleChange}
                                    value={values.user_name}
                                    error={errors.user_name}
                                    isInvalid={!!errors.user_name}
                                />

                                <NavbarFormGroup
                                    control_id="register_form_group_email"
                                    label="E-mail"
                                    type="email"
                                    name="user_email"
                                    placeholder="E-mail"
                                    form_text="Digite um e-mail válido, vamos enviar uma mensagem de confirmação"
                                    handleChange={handleChange}
                                    value={values.user_email}
                                    error={errors.user_email}
                                    isInvalid={!!errors.user_email}
                                />

                                <NavbarFormGroup
                                    control_id="register_form_group_password"
                                    label="Senha"
                                    type="password"
                                    name="user_password"
                                    placeholder="Senha"
                                    form_text="Senha deve conter entre 8 a 15 caracteres, com pelo menos 1 letra e 1 número"
                                    handleChange={handleChange}
                                    value={values.user_password}
                                    error={errors.user_password}
                                    isInvalid={!!errors.user_password}
                                />

                                <NavbarFormGroup
                                    control_id="register_form_group_password_repeat"
                                    label="Confirmação de Senha"
                                    type="password"
                                    name="user_password_repeat"
                                    placeholder="Senha"
                                    form_text="Digite sua senha novamente"
                                    handleChange={handleChange}
                                    value={values.user_password_repeat}
                                    error={errors.user_password_repeat}
                                    isInvalid={!!errors.user_password_repeat}
                                />

                                <Form.Group className="mb-3" id="register_form_grid_checkbox_accept_rules">
                                    <Form.Check
                                        required
                                        id="register_form_group_checkbox_terms"
                                        type="checkbox"
                                        name="user_accept_terms"
                                        label="Aceito os Termos"
                                        onChange={handleChange}
                                        isInvalid={!!errors.user_accept_terms}
                                        feedback={errors.user_accept_terms}
                                        feedbackType="invalid"
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" disabled={!(dirty && isValid)}>
                                    Registrar
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

export { NavbarRegisterForm };
