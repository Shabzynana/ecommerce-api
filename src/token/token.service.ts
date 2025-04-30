import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppUtilities } from 'src/app.utilities';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { TokenType } from './dto/token_type';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './entities/token.entity';
import { ITokenize } from './interfaces/token.interface';

@Injectable()
export class TokenService {

  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    
  ) {}

  private async createToken(token: ITokenize, token_type: TokenType) {
    let access_token: string;
    let hashedToken: string;

    if (!token.access_token) {
      access_token = AppUtilities.generateToken();
      hashedToken = AppUtilities.hashToken(access_token, token.userId);
    } else {
      hashedToken = token.access_token;
    }

    const data = {
      uuid: token.uuid ? token.uuid : AppUtilities.genUuid(),
      access_token: hashedToken,
      refresh_token: token.refresh_token || 'null',
      expires_in: AppUtilities.exp1hr(),
      type: token_type,
      userId: token.userId ? token.userId : null,
    } as Token;

    const userToken = await this.tokenRepository.save(data);
    return userToken;
  }

  async generateLoginToken(token: ITokenize) {
    return await this.createToken(token, TokenType.LOGIN);
  }

    


}
