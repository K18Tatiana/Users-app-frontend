import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ButtonLoading from '../../components/ButtonLoading';
import ImagePreview from '../../components/ImagePreview';
import { useCreateUserMutation } from './authApiSlice';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const SignUpForm = () => {

    const { register, handleSubmit } = useForm();
    const [ userImage, setUserImage] = useState("");
    const [ createUser, { isLoading } ] = useCreateUserMutation();
    const [ isShowPassword, setIsShowPassword ] = useState( false );

    const navigate = useNavigate();

    
    const submit = async data => {
        const frontBaseUrl = window.location.origin+"/#";
        await createUser({...data, frontBaseUrl}).unwrap();
        navigate("/login");
    }

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <h1 className="mt-4 mb-5">Create user</h1>
            <Form.Group className="mb-3" controlId="firstname">
                <Form.Label className="mb-2">
                    Firstname
                </Form.Label>
                <Form.Control
                    placeholder="Enter firstname"
                    {...register("firstName")}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastname">
                <Form.Label className="mb-2">
                    Lastname
                </Form.Label>
                <Form.Control
                    placeholder="Enter lastname"
                    {...register("lastName")}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label className="mb-2">
                    Email
                </Form.Label>
                <Form.Control
                    placeholder="Enter email"
                    {...register("email")}
                    type="email"
                />
            </Form.Group>
            <Form.Group className="mb-3 input-password" controlId="password">
                <Form.Label className="mb-2">
                    Password
                </Form.Label>
                <Form.Control
                    type={ isShowPassword ? "text" : "password" }
                    placeholder="Enter password" 
                    {...register("password")}
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
            <Form.Group className="mb-3" controlId="country">
                <Form.Label className="mb-2">
                    Country
                </Form.Label>
                <Form.Control
                    placeholder="Enter country"
                    {...register("country")}
                />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label className="mb-2">
                            Image
                        </Form.Label>
                        <Form.Control
                            placeholder="image URL"
                            {...register("image")}
                            value={userImage}
                            onChange={e => setUserImage(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col xs={4}>
                    <ImagePreview src={userImage}/>
                </Col>
            </Row>
            <ButtonLoading 
                style={{width: "100%"}} 
                className="mt-5 mb-3"
                isLoading={isLoading}
                type="submit"
            >
                Submit
            </ButtonLoading>
        </Form>
    );
};

export default SignUpForm;