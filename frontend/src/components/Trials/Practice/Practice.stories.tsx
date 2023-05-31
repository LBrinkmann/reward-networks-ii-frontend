import React, {useEffect} from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import useNetworkContext, {NetworkContextProvider} from "../../../contexts/NetworkContext";
import {edges, nodes} from "./PracticeData";
import {NETWORK_ACTIONS} from "../../../reducers/NetworkReducer";
import Practice from "./Practice";

export default {
    title: 'Trials/Practice',
    component: Practice,
    decorators: [
        (ComponentStory) => {
            return (
                <NetworkContextProvider saveToLocalStorage={false}>
                    <ComponentStory/>
                </NetworkContextProvider>
            );
        },
    ]
} as ComponentMeta<typeof Practice>;

const Template: ComponentStory<typeof Practice> = function (args) {
    const {networkState, networkDispatcher} = useNetworkContext();

    useEffect(() => {
        if (!networkState.network) {

            networkDispatcher({
                type: NETWORK_ACTIONS.SET_NETWORK,
                payload: {network: {edges: edges, nodes: nodes}, isPractice: true}
            });
        }

    }, []);


    return (
        <>
            {networkState.network && <Practice {...args}/>}
        </>
    );
};


export const PracticeTrial = Template.bind({});

PracticeTrial.args = {
    onLastTutorialStep: () => {
        // reload page
        window.location.reload();
    }
};
