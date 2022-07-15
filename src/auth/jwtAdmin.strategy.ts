import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {User} from "../user/entities/user.entity";


export interface JwtAdminPayload {
    id: string;
    isAdmin: boolean;
}

function cookieExtractor(req: any): null | string {
    return (req && req.cookies) ? (req.cookies?.jwt ?? null) : null;
}

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, "jwtAdmin") {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,

            secretOrKey: 'JKHASFA&FYAT%ARFAsgbfhab3trg B *T *TA6tQ#*#GRq@b3r*&GTCG#UGB# *G 83t QGRQGR*&G#GDSBFAF6 8g6gASDHBFY*A7f6at*(F&Tasg BF^ArdA%RASYDFh Afdp 0A8t6fart% ascjkano',
        });
    }

    async validate(payload: JwtAdminPayload, done: (error, user) => void) {
        if (!payload || !payload.id || !payload.isAdmin ) {
            return done(new UnauthorizedException(), false);
        }

        const user = await User.findOne({ where:{ tokenId: payload.id , isAdmin: payload.isAdmin}});

        if (!user) {
            return done(new UnauthorizedException(), false);
        }

        done(null, user);
    }



}