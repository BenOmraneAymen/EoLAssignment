import {create} from "zustand"  


export const useFlowStore = create((set, get) => ({
    elements : [
        {
            id: '1',
            data: { label: 'Node 1' },
            position: { x: 250, y: 5 },
            type: 'input',
        },
    ],
    setElements: (newElements) => set({ elements: newElements }),
    edges : [],
    setEdges: (edges) => set({edges}),
    edgeOptions : {
        animated: true,
        style: {
            stroke: "black",
        },
    },
}))