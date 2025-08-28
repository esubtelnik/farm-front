export interface ApiResponse<T> {
    data: T;
    successful: boolean;
    error: {
      message: string;
    };
  }
  