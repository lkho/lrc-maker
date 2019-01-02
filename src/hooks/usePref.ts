type Fixed = 0 | 1 | 2 | 3;

export const themeColor = {
    orange: "#ff691f",
    yellow: "#fab81e",
    lime: "#7fdbb6",
    green: "#19cf86",
    blue: "#91d2fa",
    navy: "#1b95e0",
    grey: "#abb8c2",
    red: "#e81c4f",
    pink: "#f58ea8",
    purple: "#981ceb",
};

export const enum ActionType {
    lang = "lang",
    spaceStart = "spaceStart",
    spaceEnd = "spaceEnd",
    fixed = "fixed",
    builtInAudio = "builtInAudio",
    screenButton = "screenButton",
    themeColor = "themeColor",
}

const initState = {
    [ActionType.lang]: "en-US",
    [ActionType.spaceStart]: 1,
    [ActionType.spaceEnd]: 0,
    [ActionType.fixed]: 3 as Fixed,
    [ActionType.builtInAudio]: false,
    [ActionType.screenButton]: false,
    [ActionType.themeColor]: themeColor.pink,
};

export type State = Readonly<typeof initState>;

export type Action = {
    [key in keyof State]: { type: key; payload: State[key] }
}[keyof State];

const reducer = (state: State, action: Action): State => {
    return {
        ...state,
        [action.type]: action.payload,
    };
};

export const usePref = (storedPerf: string) => {
    const state: Mutable<State> = initState;
    state.lang = navigator.language;
    try {
        const storedState: State = JSON.parse(storedPerf);
        const validKeys = Object.keys(initState) as Array<keyof State>;
        for (const key of validKeys) {
            if (key in storedState) {
                state[key] = storedState[key];
            }
        }
    } catch (error) {}

    return React.useReducer(reducer, state);
};