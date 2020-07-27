import * as actions from '../api';

describe('action creators', () => {
    it('should handle successful toggling', () => {
        const expectedAction = {type: 'TOGGLE_SWITCH', isOn: true};
        expect(actions.toggleSwitch(true)).toEqual(expectedAction);
    });

    it('should handle successful startAsyncCall', () => {
        const expectedAction = {type: 'START_ASYNC_CALL'};
        expect(actions.startAsyncCall()).toEqual(expectedAction);
    });

    it('should handle successful stopAsyncCall', () => {
        const expectedAction = {type: 'STOP_ASYNC_CALL'};
        expect(actions.stopAsyncCall()).toEqual(expectedAction);
    });

    it('should handle successful receiveModules', () => {
        const modules =  [
            {
                id: '1',
                title: 'Module 1 title',
                description: 'Module 1 description',
                topicIds: ['1', '2']
            },
            {
                id: '2',
                title: 'Module 2 title',
                description: 'Module 2 description',
                topicIds: ['3']
            },
            {
                id: '3',
                title: 'Module 3 title',
                description: 'Module 3 description',
                topicIds: []
            }
        ];
        const expectedAction = {type: 'RECEIVE_MODULES', modules};
        expect(actions.receiveModules(modules)).toEqual(expectedAction);
    });

    it('should handle successful receiveTopics', () => {
        const topics = [
            {
                id: '1',
                title: 'Topic 1 title',
                description: 'Description for the topic',
            },
            {
                id: '2',
                title: 'Topic 2 title',
                description: 'Description for the topic',
            },
            {
                id: '3',
                title: 'Topic 3 title',
                description: 'Description for the topic',
            },
            {
                id: '4',
                title: 'Topic 4 title',
                description: 'Description for the topic',
            }
        ];
        const expectedAction = {type: 'RECEIVE_TOPICS', topics};
        expect(actions.receiveTopics(topics)).toEqual(expectedAction);
    });
});