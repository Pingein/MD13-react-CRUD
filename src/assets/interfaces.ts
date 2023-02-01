interface GPU {
    id?: number
    manufacturer: string //'NVIDIA' | 'AMD' | 'INTEL'
    vendor: string
    model: string
    vram: number
    price: number
}

interface AxiosParameters {
    _page?: number
    _limit?: number
    _sort?: string
    _order?: "desc" | "asc"
    q?: string
}

export type { GPU, AxiosParameters }