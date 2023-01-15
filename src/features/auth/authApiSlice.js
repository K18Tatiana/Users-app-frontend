import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/users/login',
                method: 'POST',
                body: { ...credentials }
            }),
            transformErrorResponse: (response, meta, arg) => ({
                ...response, notification: "Invalid credentials"
            })
        }),
        emailVerify: builder.mutation({
            query: email => ({
                url: '/email_verify',
                method: 'POST',
                body: email
            }),
        }),
        codeVerify: builder.query({
            query: code => `/email_verify/${code}`,
            transformErrorResponse: response => ({
                response, notification: "Code not found"
            }),
            transformResponse: response => ({
                ...response, notification: "Email verified!"
            })
        }),
        createUser: builder.mutation({
            query: user => ({
                url: '/users',
                method: 'POST',
                body: user
            }),
            transformResponse: response => ({
                ...response, notification: "User created!"
            })
        }),
        passwordVerifyEmail: builder.mutation({
            query: email => ({
                url: '/password_verify',
                method: 'POST',
                body: email
            }),
            transformErrorResponse: response => {
                if(response.status === 404)
                    return {
                        ...response, 
                        notification: "User not found"
                    }
                return response
            }
        }),
        passwordVerifyCode: builder.query({
            query: code => `/password_verify/${code}`,
            transformErrorResponse: res => ({
                ...res, notification: "Code not found"
            }),
            transformResponse: res => ({
                ...res, notification: "Email verified!"
            })
        }),
        changePassword: builder.mutation({
            query: password => ({
                url: '/password_verify/change',
                method: 'POST',
                body: password
            }),
            transformResponse: res => ({
                ...res, 
                notification: "Password changed! Login with your new password"
            })
        })
    })
})

export const {
    useLoginMutation,
    useEmailVerifyMutation,
    useLazyCodeVerifyQuery,
    useCreateUserMutation,
    usePasswordVerifyEmailMutation,
    useLazyPasswordVerifyCodeQuery,
    useChangePasswordMutation
} = authApiSlice

export const selectLoginResult = authApiSlice.endpoints.login.select();
