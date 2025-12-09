declare const _default: () => {
    port: number;
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        logging: boolean;
    };
    jwt: {
        secret: string;
        refreshSecret: string;
        expiresIn: string;
    };
    nodeEnv: string;
    oauth: {
        google: {
            clientId: string;
            clientSecret: string;
            callbackURL: string;
        };
    };
};
export default _default;
