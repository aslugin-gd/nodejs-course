
export interface User {
  id: number;
  username: string;
}

export interface ErrorResponse {
  message: string;
}

export type ApiResponse<T> = T | ErrorResponse;

export interface CreatedExerciseParams {
  id: string;
}

export interface CreatedExerciseRequest {
  description: string;
  duration: number;
  date?: string;
}

export interface CreatedExerciseResponse {
	userId: number;
	exerciseId: number;
	duration: number;
	description: string;
	date: string;
}
