export type AppSuccessApiResponse = {
  data: AppItem[];
  nextPageUri: NextPageUri;
};

export type AppItem = {
  id: number;
  image?: string;
  text: string;
  detail: string;
};

export type NextPageUri = string | null; // null when last pagination

export type AppErrorApiResponse = {
  message: string;
  status: number;
};

// -----------------------


export type AnimationStyle = "lds-ellipsis" 
