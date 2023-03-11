import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { showNotification } from '../../../app/notification/notificationSlice';
import ButtonLoading from '../../../components/ButtonLoading';
import { useChangePasswordMutation } from '../authApiSlice';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const PasswordRecovery = () => {

    const [pwd, setPwd] = useState("");
    const [pwdConfirmation, setPwdConfirmation] = useState("");
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const [ isShowPassword, setIsShowPassword ] = useState( false );
    const [ isShowConfPassword, setIsShowConfPassword ] = useState( false );

    const { code } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async e => {
        e.preventDefault();
        if(pwd !== pwdConfirmation)
            return dispatch(showNotification(
                {message: "passwords are not equal", variant: "danger"}
            ))
        console.log(code);
        await changePassword({password: pwd, code}).unwrap();
        navigate('/login');
    }

    return (
        <Form onSubmit={submit}>
            <h1 className="mb-4 mt-3">New Password</h1>
            <Form.Group className="mb-3 input-password" controlId="password">
                <Form.Label className="mb-2">
                    Password
                </Form.Label>
                <Form.Control
                    placeholder="Enter password"
                    type={ isShowPassword ? "text" : "password" }
                    value={pwd}
                    onChange={e => setPwd(e.target.value)}
                    style={{paddingRight: 50}}
                />
                {
                    isShowPassword
                    ?
                    <AiFillEyeInvisible className='btn-password' onClick={ () => setIsShowPassword(false) } />
                    :
                    <AiFillEye className='btn-password' onClick={ () => setIsShowPassword(true) } />
                }
            </Form.Group>
            <Form.Group className="mb-3 input-password" controlId="password-confirmation">
                <Form.Label className="mb-2">
                    Confirm password
                </Form.Label>
                <Form.Control
                    placeholder="Enter password again"
                    type={ isShowConfPassword ? "text" : "password" }
                    value={pwdConfirmation}
                    onChange={e => setPwdConfirmation(e.target.value)}
                    style={{paddingRight: 50}}
                />
                {
                    isShowConfPassword
                    ?
                    <AiFillEyeInvisible className='btn-password' onClick={ () => setIsShowConfPassword(false) } />
                    :
                    <AiFillEye className='btn-password' onClick={ () => setIsShowConfPassword(true) } />
                }
            </Form.Group>
            <ButtonLoading
                isLoading={isLoading}
                type="submit"
                style={{width: "100%"}}
                className="mt-3"
            >
                Submit
            </ButtonLoading>
        </Form>
    );
};

export default PasswordRecovery;