
    export type RemoteKeys = 'federation_provider/Store';
    type PackageType<T> = T extends 'federation_provider/Store' ? typeof import('federation_provider/Store') :any;