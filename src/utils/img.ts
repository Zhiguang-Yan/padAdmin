/**
 * flie文件转成base64
 * @param file
 * @returns
 */
export function toBase64(file: File) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      resolve(e.target?.result)
    }
  })
}

/**
 * base64转flie文件
 * @param dataurl
 * @param filename
 * @returns
 */
export function toFile(dataurl: string, filename: string = 'file') {
  const arr: any = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const suffix = mime.split('/')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime,
  })
}

/**
 * url转base64图片
 * @param url
 */
export function urlToBase64(url: string, outputFormat: string = 'image/jpg') {
  return new Promise((resolve) => {
    let dataURL = null
    // @ts-ignore
    let canvas: HTMLCanvasElement | null = document.createElement('CANVAS')
    const ctx = canvas!.getContext('2d')
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      canvas!.height = img.height
      canvas!.width = img.width
      ctx!.drawImage(img, 0, 0)
      dataURL = canvas!.toDataURL(outputFormat)
      canvas = null
      resolve(dataURL)
    }
    img.src = `${url}?t=${new Date().valueOf()}` // 防止oss的缓存问题
  })
}
