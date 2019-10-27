import { SessionHolderModel } from './sessionholder-model';

export interface RegistrationModel extends SessionHolderModel {
    weight: number;
    height: number;
    age: number;
}
