import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2MjYxYjBmYS04ZjQ4LTQ0NzUtODhiNi0xMjIwNjg1YjZiZjUifQ.eyJleHAiOjE3NDM1NTUxNDYsImlhdCI6MTc0MzU1MzM0NiwianRpIjoiZDliMmNlYTktNWNjZi00YWQ2LTliNzktZWVhNmJhMTRmMjkxIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9lbmN1cnRhZG9yIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9lbmN1cnRhZG9yIiwic3ViIjoiOWQ1YmI4ZjctZTgxYS00ODdiLWFhMTYtNDE3ZDc1MTAxMzE1IiwidHlwIjoiUmVmcmVzaCIsImF6cCI6Im5lc3QtYXBpIiwic2lkIjoiM2ZiZGVjY2MtZDBiYy00ZDI3LTkyMjctMGU0NDMxY2ZlNzE3Iiwic2NvcGUiOiJiYXNpYyBwcm9maWxlIGFjciB3ZWItb3JpZ2lucyBlbWFpbCByb2xlcyJ9.U7MmoO0wapldVzTJquMajLSNWZwlKGdxAgc05-V3bDOvVgosCesGrCcanmZRUBCc_IT7JNBb7nStVWR3L6P3Hg' })
    refresh_token: string;
  }