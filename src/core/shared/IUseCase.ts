import { Result } from "./types/Result";

export default interface IUseCase<IN, OUT> {
	execute(input: IN): Promise<Result<OUT>>;
}