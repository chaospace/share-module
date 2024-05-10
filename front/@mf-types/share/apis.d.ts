
    export type RemoteKeys = 'share/Store';
    type PackageType<T> = T extends 'share/Store' ? typeof import('share/Store') :any;