export const natsWrapper = {
    client: {
        publish: jest.fn().mockImplementation((subject: string, data: string, callback: () => void) => {
                console.log('Mock Nats wrapper called');
                callback();
        })
    }
};