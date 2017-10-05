const handlers = {
    UserCreated: (data, event) => {
        return {
            ...data,
            ...event.payload
        }
    },
    UserUsernameChanged: (data, event) => {
        return {
            ...data,
            ...event.payload
        }
    },
    UserBoarded: () => {},
    UserPasswordChanged: (data, event) => {
        return {
            ...data,
            ...event.payload
        }
    },
    UserActivated: (data, event) => {
        return {
            ...data,
            ...event.payload
        }
    },
    UserLoggedIn: (data, event) => {
        return {
            ...data,
            lastLogin: new Date
        }
    },
};

module.exports = snapshot => {
    return {
        play: (events, snapshot) => {
            return events.reduce((carry, event) => handlers[event.payload._event](carry, event), snapshot || {});
        }
    };
};