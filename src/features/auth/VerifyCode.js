import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import ButtonLoading from '../../components/ButtonLoading';
import { useLazyCodeVerifyQuery } from './authApiSlice';
import { addCode } from './authSlice';

const VerifyCode = () => {

    const [ code, setCode ] = useState("");
    const navigate = useNavigate();

    const [ verifyCode, { isLoading }] = useLazyCodeVerifyQuery();

    const dispatch = useDispatch();

    const submit = async (e) => {
        e.preventDefault();
        await verifyCode(code).unwrap();
        dispatch(addCode(code));
        navigate("/signup/form")
    }

    const email = useSelector(state => state.auth.email);

    if(!email) return <Navigate to="/signup" />
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

export default VerifyCode;