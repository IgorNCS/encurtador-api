import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ClsService } from 'nestjs-cls';
import { DecodedToken } from 'src/auth/dto/login.dto';
import { UserNotFoundException } from './exceptions/not-found.exception';

describe('UserService', () => {
    let service: UserService;
    let clsService: ClsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: ClsService,
                    useValue: {
                        get: jest.fn(),
                        set: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        clsService = module.get<ClsService>(ClsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('get', () => {
        it('should return user when available in clsService', () => {
          const user: DecodedToken = {
            sid: 'e7d3c6c4-3b6d-4e7a-9eae-64c93f9f7123',
            iat: 123456789,
            exp: 987654321,
            jti: 'test-jti',
            iss: 'test-issuer',
            aud: 'test-audience',
            sub: 'test-subject',
            typ: 'Bearer',
            azp: 'test-azp',
            session_state: 'test-session-state',
            acr: 'test-acr',
            realm_access: {
              roles: ['test-role']
            },
            resource_access: {
              test_resource: {
                roles: ['test-role']
              }
            },
            scope: 'test-scope',
            email_verified: true,
            preferred_username: 'test-preferred-username'
          };
            jest.spyOn(clsService, 'get').mockReturnValue(user);
            expect(service.get()).toEqual(user);
        });

        it('should throw UserNotFoundException when user is not available', () => {
            jest.spyOn(clsService, 'get').mockReturnValue(null);
            expect(() => service.get()).toThrow(UserNotFoundException);
        });
    });

    describe('getOrNull', () => {
        it('should return user when available in clsService', () => {
            const user: DecodedToken = {
              sid: 'e7d3c6c4-3b6d-4e7a-9eae-64c93f9f7123',
              iat: 123456789,
              exp: 987654321,
              jti: 'test-jti',
              iss: 'test-issuer',
              aud: 'test-audience',
              sub: 'test-subject',
              typ: 'Bearer',
              azp: 'test-azp',
              session_state: 'test-session-state',
              acr: 'test-acr',
              realm_access: {
                roles: ['test-role']
              },
              resource_access: {
                test_resource: {
                  roles: ['test-role']
                }
              },
              scope: 'test-scope',
              email_verified: true,
              preferred_username: 'test-preferred-username'
            };
            jest.spyOn(clsService, 'get').mockReturnValue(user);
            expect(service.getOrNull()).toEqual(user);
        });

        it('should return null when user is not available', () => {
            jest.spyOn(clsService, 'get').mockReturnValue(null);
            expect(service.getOrNull()).toBeNull();
        });
    });

    describe('create', () => {
        it('should set user in clsService', () => {
          const user: DecodedToken = {
            sid: 'e7d3c6c4-3b6d-4e7a-9eae-64c93f9f7123',
            iat: 123456789,
            exp: 987654321,
            jti: 'test-jti',
            iss: 'test-issuer',
            aud: 'test-audience',
            sub: 'test-subject',
            typ: 'Bearer',
            azp: 'test-azp',
            session_state: 'test-session-state',
            acr: 'test-acr',
            realm_access: {
              roles: ['test-role']
            },
            resource_access: {
              test_resource: {
                roles: ['test-role']
              }
            },
            scope: 'test-scope',
            email_verified: true,
            preferred_username: 'test-preferred-username'
          };
            const setSpy = jest.spyOn(clsService, 'set');
            service.create(user);
            expect(setSpy).toHaveBeenCalledWith('user', user);
        });
    });

    describe('destroy', () => {
        it('should set user to undefined in clsService', () => {
            const setSpy = jest.spyOn(clsService, 'set');
            service.destroy();
            expect(setSpy).toHaveBeenCalledWith('user', undefined);
        });
    });
});