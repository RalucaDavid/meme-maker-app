export interface Meme{
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
}

export interface CreatedMeme {
    url: string;
    page_url: string;
}

export type FormMode = 'simple' | 'advanced';

export interface MemeSubmission {
    templateId: string;
    mode: FormMode;
    firstText?: string;
    secondText?: string;
    boxes?: MemeTextBox[];
}

export interface MemeTextBox {
  text: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  color?: string;
  outline_color?: string;
}

export interface MemeFormPayload {
  mode: FormMode;
  firstText?: string;
  secondText?: string;
  boxes?: MemeTextBox[];
}