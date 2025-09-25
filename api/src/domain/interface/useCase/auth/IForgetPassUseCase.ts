export interface IForgetPassUseCase {
    execute(email:string,role:string):Promise<void>;
}