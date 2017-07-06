/**
 * Created by smichaels on 6/27/17.
 */
const NO_CONNECTION = null

export default createWebsocketMiddleware

export const ActionTypes = {
    WEBSOCKET_CONNECTED: '@@redux-websocket/WEBSOCKET_CONNECTED',
    WEBSOCKET_DISCONNECTED: '@@redux-websocket/WEBSOCKET_DISCONNECTED',
    WEBSOCKET_ERROR: '@@redux-websocket/WEBSOCKET_ERROR',
    RECEIVED_WEBSOCKET_DATA: '@@redux-websocket/RECEIVED_WEBSOCKET_DATA',
    WEBSOCKET_SEND: '@@redux-websocket/WEBSOCKET_SEND'
}

export function createWebsocketMiddleware (options = {}) {
    const connections = {}

    return function (store) {
        if (options.defaultEndpoint) {
            setupSocket(options.defaultEndpoint)
        }

        return function (next) {
            return function (action) {

                if (!isSocketAction(action)) {
                    return next(action)
                }

                console.log('this is a socket action');

                const connection = connections[options.defaultEndpoint]

                if (connection === NO_CONNECTION && !options.defaultEndpoint) {
                    throw new Error(undefinedEndpointErrorMessage(action))
                }

                if (action.type == ActionTypes.WEBSOCKET_SEND) {
                    console.log('sending message: ' + action.payload + ' to server');

                    const result = JSON.stringify(action);

                    connection.websocket.send(result);
                } else {
                    return next(action)
                }
            }
        }

        function setupSocket (endpoint) {
            console.log("endpoint = " + endpoint);
            const connection = {
                endpoint: endpoint,
                websocket: new WebSocket(endpoint),
                queue: []
            }

            connection.websocket.onmessage = (function (evt) {
                store.dispatch(createMessageAction(endpoint, evt))
            })

            connection.websocket.onopen = (function () {
                console.log('onopen called');
                store.dispatch(createConnectionAction(endpoint))
            })

            connection.websocket.onclose = (function () {
                store.dispatch(createDisconnectionAction(endpoint))
            }),

            connection.websocket.onerror = (function (error) {
                store.dispatch(createErrorAction(endpoint, error))
            })


            connections[endpoint] = connection

            return connection
        }
    }
}

export function isSocketAction (action) {

    console.log(action);
    if (!action) return false;
    console.log(action.meta);
    if (!action.meta) return false;
    console.log(action.meta.websocket);
    if (!action.meta.websocket) return false;

    return Boolean([
            ActionTypes.WEBSOCKET_CONNECTED,
            ActionTypes.WEBSOCKET_DISCONNECTED,
            ActionTypes.RECEIVED_WEBSOCKET_DATA,
            ActionTypes.WEBSOCKET_ERROR,
            ActionTypes.WEBSOCKET_SEND
        ].indexOf(action.type) > -1);
}

function createConnectionAction (endpoint) {
    return {
        type: ActionTypes.WEBSOCKET_CONNECTED,
        meta: { websocket: endpoint }
    }
}

function createDisconnectionAction (endpoint) {
    return {
        type: ActionTypes.WEBSOCKET_DISCONNECTED,
        meta: { websocket: endpoint }
    }
}

function createErrorAction (endpoint, error) {
    return {
        type: ActionTypes.WEBSOCKET_ERROR,
        payload: new Error(error),
        meta: { websocket: endpoint, error: true }
    }
}

function createMessageAction (endpoint, evt) {

    console.log('Creating incoming message action: ' + evt.data)


    return {
        type: ActionTypes.RECEIVED_WEBSOCKET_DATA,
        payload: evt.data,
        meta: { websocket: endpoint }
    }
}

function undefinedEndpointErrorMessage (action) {
    return `Whoops! You tried to dispatch an action to a socket instance that
  doesn't exist, as you didn't specify an endpoint in the action itself:
  ${JSON.stringify(action, null, 4)}
  Or you didn't set the 'defaultEndpoint' config option when creating your
  middleware instance.`
}