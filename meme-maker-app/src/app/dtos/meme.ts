export interface MemeResponse {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
}

export interface MemesResponse {
    succes: boolean;
    data: {
        memes: MemeResponse[]
    }
}

export interface CreatedMemeResponse {
    url: string;
    page_url: string;
}

export interface CreateMemeResponse {
    success: boolean;
    data?: CreatedMemeResponse;
    error_message?: string;
}