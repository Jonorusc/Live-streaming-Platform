'use server'

import { revalidatePath } from 'next/cache'

export const $revalidatePath = (path: string, type?: 'page' | 'layout') => {
  revalidatePath(path, type)
}
