import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    console.log(formRef);

    const handleSubmit = useCallback(async (data: object) => {
        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome é obrigatório'),
                email: Yup.string().required('Email é obrigatório').email('Digite um email válido'),
                password: Yup.string().min(6, 'Mínimo 6 dígitos'),
            });

            await schema.validate(data, {
                abortEarly: false
            });
        } catch (err) {
            console.log(err);

            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <Container>

            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber logo" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome" />

                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Password"
                    />

                    <Button type="submit">Cadastrar</Button>

                </Form>

                <a href="login">
                    <FiArrowLeft />
            Voltar para logon
            </a>
            </Content>
        </Container>
    )
}

export default SignUp;