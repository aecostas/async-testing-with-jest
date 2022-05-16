const { run, getValue, getAsyncValue } = require('./index.js')


describe('Testing timing', () => {

    afterEach(() => {
        // reset the usage of fake timers after each test
        // to avoid using fakes if not needed/desired
        jest.useRealTimers()
    })

    it('Should increment value periodically - without waiting for interval ticks', () => {
        jest.useFakeTimers();

        run()

        // runOnlyPendigTimers twice to emulate two ticks 
        // of the real setInterval
        jest.runOnlyPendingTimers();
        jest.runOnlyPendingTimers();

        const value = getValue()

        expect(value).toEqual(2)
    })

    it('Should return a value asynchronously - blocking', async () => {
        // problem with this approach: next line is blocked until
        // the promise is resolved. If the function takes more than 5 seconds
        // the test will fail due internal Jest timeouts
        const value = await getAsyncValue()

        expect(value).toEqual(5)
    })

    it('Should return a value asynchronously - non blocking', (done) => {
        // to avoid blocking issues, setTimeout must be mocked. The problem
        // in this case is that it is called within a Promise, so if we
        // call `runOnlyPendingTimers` before waiting for the promise, 
        // the timeout will never end, because it is 
        
        jest.useFakeTimers();

        const valuePromise = getAsyncValue()

        jest.runOnlyPendingTimers();

        valuePromise.then(value => {
            expect(value).toEqual(5)
            done()
        })

    })

})