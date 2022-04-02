export async function sleep(msec: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, msec));
}