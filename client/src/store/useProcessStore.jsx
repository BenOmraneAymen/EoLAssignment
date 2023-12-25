import axios from "axios";
import { create } from "zustand";


export const useProcessStore = create((set) => ({
    process: [{
        id: 'a',
        data: { label: 'Node A' },
        position: { x: 250, y: 0 },
    },
    {
        id: 'b',
        data: { label: 'Node B' },
        position: { x: 100, y: 100 },
    },],
    setProcess: (process) => set({ process }),
    addProcess: (process) => set((state) => ({ process: [...state.process, process] })),
    getProcessPET: async () => {
        await axios.get(`http://localhost:4000/processes/PET`)
            .then((response) => {

                let data = response.data.map((process) => {
                    return {
                        id:  process.position.toString(),
                        data: { label: process.name },
                        position: { x: process.position * 150, y: 0 },
                    };
                })

                set({ process: data })

            })
            .catch((error) => {
                set({ process: [] })
            });
    }
}));