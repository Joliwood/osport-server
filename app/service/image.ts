import crypto from 'crypto';
import * as url from 'url';
import fs from 'fs';
import sharp from 'sharp';
import ServerError from '../helpers/errors/server.error.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

export function createRandomName(bytes = 32) {
  return crypto.randomBytes(bytes).toString('hex');
}

export function resizeImage(buffer: Buffer, height: number, width: number) {
  const resizedBuffer = sharp(buffer).resize(
    {
      height,
      width,
    },
  ).toBuffer();
  return resizedBuffer;
}

export async function getExtension(buffer: Buffer) {
  try {
    const extension = await sharp(buffer).metadata().then((metadata) => metadata.format);
    return extension;
  } catch (error) {
    throw new ServerError('Could not get extension');
  }
}

export async function writeFile(buffer: Buffer) {
  try {
    const extension = await getExtension(buffer);
    const name = createRandomName();
    const relativePath = `/images/${name}.${extension}`;
    fs.writeFileSync(`${dirname}/../../public/images/${name}.${extension}`, buffer);
    return { relativePath, name };
  } catch (error) {
    throw new ServerError(`Could not write file :${error}`);
  }
}

export async function saveImageOnServer(
  { buffer, height, width }:
    { buffer: Buffer, height?: number, width?: number },
) {
  if (height && width) {
    const resizedBuffer = await resizeImage(buffer, height, width);
    const { relativePath, name } = await writeFile(resizedBuffer);
    return { relativePath, name };
  }
  const { relativePath, name } = await writeFile(buffer);
  return { relativePath, name };
}

export async function deleteImageFromServer(relativePath: string) {
  try {
    fs.rmSync(`${dirname}/../../public${relativePath}`);
  } catch (error) {
    throw new ServerError(`Could not delete file${error}`);
  }
}
