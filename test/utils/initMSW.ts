import type { UnhandledRequestStrategy } from 'msw/lib/core/utils/request/onUnhandledRequest';
import { setupServer } from 'msw/node';
import {
    afterEach,
    beforeAll,
    afterAll,
} from 'vitest';

type InitMswServerOptions = {
    /**
     * Whether handlers should be reseted after each test
     * @default true
     */
    autoReset?: boolean;
    /**
     * Specifies how to react to a request that has no corresponding request handler
     * @default 'warn'
     */
    onUnhandledRequest?: UnhandledRequestStrategy | 'nukeme';
};

export const initMSWServer = ({
    autoReset = true,
    onUnhandledRequest = 'warn',
}: InitMswServerOptions = {}) => {
    const server = setupServer();

    beforeAll(() => {
        server.listen({
            onUnhandledRequest:
                onUnhandledRequest === 'nukeme'
                    ? // FIXME: temporarily neutralize nukeme option until we figure out why it's reporting errors on the wrong tests
                    // (req) => {
                    //     const error = new Error(
                    //       `[MSW] Error: captured a request without a matching request handler:\n${req.method} ${req.url}`,
                    //     );

                    //     /**
                    //      * Jest will fail a test on unhandled promise rejection (throwing an exception is not enough)
                    //      * Throwing is not actually necessary and doesn't do anything, it's just about communicating intention
                    //      **/
                    //     throw Promise.reject(error);
                    //   }
                    'warn'
                    : onUnhandledRequest,
        });
    });

    afterAll(() => server.close());

    if (autoReset) {
        afterEach(() => {
            server.resetHandlers();
        });
    }

    return server;
};
