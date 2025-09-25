export interface IClearFCMTokenUseCase {
    execute(userId: string,role: string): Promise<void>
}