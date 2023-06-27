import { INestApplication, Injectable } from "@nestjs/common";

@Injectable()

export class AppHostService {
    public instance: INestApplication;
}
