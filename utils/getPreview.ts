export default function getPreview(value: string): string {
  // 提取第一行內容
  const previewContent = value.match(/^[^\n]+/)?.[0];

  if (previewContent) {
    // 如果內容超出 90 個字符，進行裁剪
    if (previewContent.length > 90) {
      // 先截取前 90 個字符
      let truncated = previewContent.substring(0, 90);

      // 輔助函數判斷是否是中文字符
      const isChinese = (char: string) => /[\u4e00-\u9fff]/.test(char);

      // 如果最後一個字符是英文字符，我們嘗試在單詞邊界截斷（即空格）
      if (!isChinese(truncated[89])) {
        const lastSpaceIndex = truncated.lastIndexOf(" ");

        // 如果存在空格且不在最開頭，我們就在空格處截斷
        if (lastSpaceIndex > 0) {
          truncated = truncated.substring(0, lastSpaceIndex);
        }
      }

      return truncated + "...";
    } else {
      return previewContent;
    }
  }

  return "";
}
