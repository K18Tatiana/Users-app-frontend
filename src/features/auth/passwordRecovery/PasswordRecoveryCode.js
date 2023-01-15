import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import ButtonLoading from '../../../components/ButtonLoading';
import { useLazyPasswordVerifyCodeQuery } from '../authApiSlice';
import { addCode } from '../authSlice';

const PasswordRecoveryCode = () => {

    const [ code, setCode ] = useState("");

    const [ verifyCode, { isLoading } ] = useLazyPasswordVerifyCodeQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async e => {
        e.preventDefault();
        await verifyCode(code).unwrap();
        dispatch(addCode(code));
        navigate("/password_recovery/new_password")
    }
    
    const email = useSelector(state => state.auth.email);

    if(!email) return <Navigate to="/recovery_password/send_code" />
    return (
        <Form onSubmit={submit}>
            <h1 className="my-4">Verification code</h1>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label className="mb-2">
                    We sent you a code to your email <b>{email}</b>. Type the code here
                </Form.Label>
                <Form.Control
                    placeholder="Enter code"
                    onChange={e => setCode(e.target.value)}
                    value={code}
                />
            </Form.Group>
            <ButtonLoading 
                isLoading={isLoading} 
                type='submit'
            >
                Send
            </ButtonLoading>
        </Form>
    );
};

export default PasswordRecoveryCode;