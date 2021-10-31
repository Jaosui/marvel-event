export const initId = async() => {
  const liff = (await import('@line/liff')).default
  const liffId = '1656495478-Al05oEgX'
  try {
    await liff.init({ liffId });
  } catch (error) {
    console.error('liff init error', error.message)
  }
}
