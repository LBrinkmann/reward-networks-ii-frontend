import React, {useEffect} from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import TryYourself from "./TryYourself";

import data from "../../Network/examples";
import useNetworkContext, {NetworkContextProvider} from "../../../contexts/NetworkContext";
import {NETWORK_ACTIONS} from "../../../reducers/NetworkReducer";


export default {
    title: 'Trials/TryYourself',
    component: TryYourself,
    decorators: [
        (ComponentStory) => {
            return (
                <NetworkContextProvider saveToLocalStorage={false}>
                    <ComponentStory/>
                </NetworkContextProvider>
            );
        },
    ]
} as ComponentMeta<typeof TryYourself>;

const Template: ComponentStory<typeof TryYourself> = function (args) {
    const {networkState, networkDispatcher} = useNetworkContext();

    const setNetwork = () => {
        networkDispatcher({
            type: NETWORK_ACTIONS.SET_NETWORK,
            payload: {
                network: {
                    edges: data[0].edges,
                    nodes: data[0].nodes
                },
                isPractice: false
            }
        });
    }

    useEffect(() => {
        if (!networkState.network) {
            setNetwork();
        }
    }, [networkState.isNetworkFinished]);




    return (
        <>
            {networkState.network &&
                <TryYourself{...args}/>}
        </>


    );
};

export const Default = Template.bind({});

Default.args = {
    solution: [9, 3, 8, 7, 4, 6, 7, 4, 6],
    teacherId: 1,
    teacherTotalScore: 10,
    endTrial: (data: any) => console.log(data),
    teacherWrittenSolution: "I tried many different things. It turned out that the best strategy is to take exactly three violet arrows as early as possible and to go for dark green arrows afterwards. Do not take a dark green arrow before taking at least three violet arrows first",
    playerTotalPoints: 1000,
};
