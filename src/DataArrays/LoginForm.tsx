interface LoginFormType {
    lable : string ,
    placeholder : string,
    inputType : string
}

export const LoginForm : Array<LoginFormType> = [
    {
        lable : 'email',
        placeholder : 'Enter your email',
        inputType : 'email'
    },
    {
        lable : 'Password',
        placeholder : 'Enter your password',
        inputType : 'password'
    }
]