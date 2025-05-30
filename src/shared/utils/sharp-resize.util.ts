// src/shared/utils/sharp-resize.ts
import sharp from 'sharp'

export async function sharpResize(
   buffer: Buffer,
   sizes: { name: string; width: number }[]
): Promise<{ name: string; data: Buffer }[]> {
   const tasks = sizes.map(async ({ name, width }) => {
      const data = await sharp(buffer)
         .resize({ width, withoutEnlargement: true })
         .toFormat('webp')
         .toBuffer()
      return { name, data }
   })
   return Promise.all(tasks)
}
