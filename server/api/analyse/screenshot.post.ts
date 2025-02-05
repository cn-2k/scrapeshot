import { z } from 'zod'
import { connectBrowser } from '@/utils/config';

const screenshotSchema = z.object({
  pageUrl: z.string().url(),
  width: z.number().int().positive().optional().nullable(),
  height: z.number().int().positive().optional().nullable(),
  fullPage: z.boolean().optional()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { pageUrl, fullPage, width, height } = screenshotSchema.parse(body)

  const { page } = await connectBrowser(pageUrl);

  try {
    if (width && height) {
      await page.setViewport({
        width,
        height,
      });
    }

    const screenshotBase64 = await page.screenshot({ encoding: 'base64', fullPage });

    page.browser().close();

    return {
      success: true,
      url: pageUrl,
      fullPage: fullPage,
      width: width,
      height: height,
      screenshotBase64: `data:image/png;base64,${screenshotBase64}`,
    };

  } catch (error) {
    console.error('Erro ao capturar a imagem:', error);
    await page.browser().close();
    throw new Error('Erro ao capturar a imagem.');
  }
})
