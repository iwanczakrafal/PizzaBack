import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt.strategy';
import {AuthLoginDto} from "./dto/auth-login.dto";
import { sign } from 'jsonwebtoken';
import {JwtAdminPayload} from "./jwtAdmin.strategy";
import {User} from "../user/entities/user.entity";
import { v4 as uuid } from 'uuid';
import {hashPassword} from "../utils/hash-pasword";
import {Response} from "express";


@Injectable()
export class AuthService {
    private createToken(tokenId: string): {accessToken: string, expiresIn: number} {
        const payload: JwtPayload = { id: tokenId}
        const expiresIn = 60 * 60 * 24;
        const accessToken = sign(payload, 'JKHASFA&FYAT%ARFAsgbfhab3trg B *T *TA6tQ#*#GRq@b3r*&GTCG#UGB# *G 83t QGRQGR*&G#GDSBFAF6 8g6gASDHBFY*A7f6at*(F&Tasg BF^ArdA%RASYDFh Afdp 0A8t6fart% ascjkano', { expiresIn });
        return {
            accessToken,
            expiresIn,
        };
    };

    private createAdminToken(tokenId: string, isAdmin: boolean): {adminToken: string, expiresIn: number} {
        const payload: JwtAdminPayload = { id: tokenId, isAdmin }
        const expiresIn = 60 * 60 * 24;
        const adminToken = sign(payload, 'JKHASFA&FYAT%ARFAsgbfhab3trg B *T *TA6tQ#*#GRq@b3r*&GTCG#UGB# *G 83t QGRQGR*&G#GDSBFAF6 8g6gASDHBFY*A7f6at*(F&Tasg BF^ArdA%RASYDFh Afdp 0A8t6fart% ascjkano', { expiresIn });
        return {
            adminToken,
            expiresIn,
        };
    };

    private async generateToken(user: User): Promise<string> {
        let token;
        let userWithThisToken = null;
        do {
            token = uuid();
            userWithThisToken = await User.findOne({where:{ tokenId: token} });
        } while (!!userWithThisToken);
        user.tokenId = token;
        await user.save();

        return token ;
    };


    async login(req: AuthLoginDto, res: Response): Promise<any> {

        try {
            const user = await User.findOne({where: {
                    email: req.email,
                    passwordHash: hashPassword(req.password),
                }
            });

            if (!user) {
                return res.json({error: 'Invalid login data!'});
            }

            if(user.isAdmin){
                const token = await this.createAdminToken(await this.generateToken(user), user.isAdmin);


                return res
                    .cookie('jwt', token.adminToken, {

                        secure: false,
                        domain: 'localhost',
                        httpOnly: true,
                    })
                    .json({
                        ok: true,
                        isAdmin: true,
                        adminToken: token.adminToken
                    });
            }

            const token = await this.createToken(await this.generateToken(user));

            return res
                .cookie('jwt', token.accessToken, {

                    secure: false,
                    domain: 'localhost',
                    httpOnly: true,
                })
                .json({
                    ok: true,
                    isAdmin: false,
                    accessToken: token.accessToken
                });

        } catch (e) {
            return res.json({error: e.message});
        }
    };

    async logout(user: User, res: Response) {
        try {
            user.tokenId = null;
            await user.save();
            res.clearCookie(
                'jwt',
                {
                    secure: false,
                    domain: 'localhost',
                    httpOnly: true,
                }
            );
            return res.json({ok: true});
        } catch (e) {
            return res.json({error: e.message});
        }
    }
}
