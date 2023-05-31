import React, {FC, useCallback} from "react"
import {StaticNetworkEdgeInterface, StaticNetworkNodeInterface} from "../StaticNetwork/StaticNetwork";
import NetworkNode from "../NetworkNode";
import NetworkEdge from "../NetworkEdge";
import {Box, Typography} from "@mui/material";
import TutorialTip from "../../Tutorial/TutorialTip";

interface LinearSolutionInterface {
    /** Array of nodes of the network */
    nodes: StaticNetworkNodeInterface[];
    /** Array of edges of the network */
    edges: StaticNetworkEdgeInterface[];
    /** The list of moves with the starting node as the first element */
    moves: number[];
    /** Title of the solution */
    title?: string;
    /** Size of the SVG component. Default width = 800, height = 50 */
    size?: { width: number, height: number };
    /** Node size. Default = 20 */
    nodeRadius?: number;
    /** Edge width. Default = 3 */
    edgeWidth?: number;
    /** Gap between nodes. Default = 60 */
    gap?: number;
    /** Onset of the first node. Default = 24 */
    onset?: number;
    /** unique id of the component */
    id?: number;
    /** show tutorial tip */
    showTutorial?: boolean;
    /** Callback to handle tutorial tip close */
    onTutorialClose?: () => void;
    /** Rewards range */
    allRewards?: number[];
    showStepsLabel?: boolean;
}


export const LinearSolution: FC<LinearSolutionInterface> = (props) => {
    const {
        size = {width: 530, height: 50},
        nodeRadius = 20,
        gap = 60,
        onset = 24,
        edgeWidth = 3,
        nodes,
        edges,
        moves,
        id = 100,
        showTutorial = false,
        allRewards = [-50, 0, 100, 200, 400],
        showStepsLabel = true
    } = props;

    let colors = ['#c51b7d', '#e9a3c9', '#e6f5d0', '#a1d76a', '#4d9221',];

    const setNextNodeColor = useCallback((targetNodeId: number, currentNodeId: number) => {
        const reward = edges.find(edge => (edge.source_num === currentNodeId) && (edge.target_num === targetNodeId))?.reward;
        // check if reward in not null
        return reward === null ? '#ffffff' : colors[allRewards.indexOf(reward)];
    }, [edges, allRewards, colors]);

    return (
        <TutorialTip
            tutorialId={"practice_linear_solution"}
            isTutorial={showTutorial}
            isShowTip={false}
            onTutorialClose={props.onTutorialClose}
            placement="left"
        >
            <Box>
                {showStepsLabel && <Typography variant="h4" align='center'>
                    Steps
                </Typography>}
                <svg width={size.width} height={size.height + gap / 2}>
                    <g>
                        {moves.map((move, idx) => {
                            const node = nodes[move];
                            return (
                                <React.Fragment key={"move" + idx}>
                                    <text
                                        x={onset + idx * gap}
                                        y={size.height / 2}
                                        style={{fontWeight: "bold", fontSize: '25px'}}
                                        textAnchor="middle"
                                    >
                                        {idx > 0 ? idx : ' '}
                                    </text>
                                    <NetworkNode
                                        x={onset + idx * gap}
                                        y={size.height / 2 + gap / 2}
                                        nodeInx={node.node_num}
                                        Text={node.display_name}
                                        Radius={nodeRadius}
                                        onNodeClick={() => {
                                        }}
                                        status={idx > 0 ? 'next' : 'active'}
                                        nextNodeColor={idx > 0 && setNextNodeColor(node.node_num, moves[idx - 1])}
                                        isValidMove={false}
                                        key={"linear-solution-node-" + idx}
                                    />
                                    <LinearSolutionEdge
                                        {...props}
                                        colors={colors}
                                        allRewards={allRewards}
                                        edges={edges}
                                        moves={moves}
                                        moveIdx={idx}
                                        gap={gap}
                                        nodeRadius={nodeRadius}
                                        onset={onset}
                                        edgeWidth={edgeWidth}
                                        id={id}
                                        size={size}
                                    />
                                </ React.Fragment>
                            );
                        })};
                    </g>
                </svg>
            </Box>
        </TutorialTip>
    )
}

interface ILinearSolutionEdge extends LinearSolutionInterface {
    moveIdx: number;
    colors: string[];
}

const LinearSolutionEdge: FC<ILinearSolutionEdge> = (props) => {
    const {
        edges,
        moves,
        moveIdx,
        gap,
        nodeRadius,
        onset,
        edgeWidth,
        id,
        size,
        colors,
        allRewards
    } = props;
    if (moveIdx < moves.length - 1) {
        const edge = edges.filter((edge) =>
            edge.source_num === moves[moveIdx] && edge.target_num === moves[moveIdx + 1])[0];

        // the point on the border of the source node
        const sourceX = onset + moveIdx * gap + nodeRadius;
        // the point on the border of the target node
        const targetX = onset + (moveIdx + 1) * gap - nodeRadius;

        return (
            <NetworkEdge
                reward={edge.reward}
                edgeWidth={edgeWidth}
                edgeStyle={"normal"}
                idx={moveIdx + id} // add id to avoid conflict with edge idx in other components
                showRewardText={false}
                arc_type={edge.arc_type}
                source_x={sourceX}
                source_y={size.height / 2 + gap / 2}
                arc_x={sourceX + (targetX - sourceX)}
                arc_y={size.height / 2 + gap / 2}
                target_x={targetX}
                target_y={size.height / 2 + gap / 2}
                key={'linear-solution-edge-' + moveIdx}
                color={colors[allRewards.indexOf(edge.reward)]}
            />
        );
    } else {
        return null;
    }
}


export default LinearSolution