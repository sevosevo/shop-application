interface Error{
    status ?: number;
    field ?: string
    code : string;
    message : string;
}

export default Error;
