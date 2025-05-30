export class SessionResponseDto {
   id: string
   createdAt: Date
   expiresAt: Date
   ip?: string
   userAgent?: string

   constructor(partial: Partial<SessionResponseDto>) {
      Object.assign(this, partial)
   }
}
