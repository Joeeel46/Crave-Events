import { UseCaseRegistry } from "./useCase.registery";
import { RepositoryRegistry } from "./repository.registery";

export class DependencyInjection {
    static registerAll():void{
        UseCaseRegistry.registerUseCase();
        RepositoryRegistry.registerRepositories();
    }
}