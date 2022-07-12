import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// 格式化utc时间
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  // utcOffset(8)偏移8小时
  return dayjs.utc(utcString).utcOffset(8).format(format)
}

// 格式化时间戳
// export function formatTimestamp(
//   timestamp: number,
//   format: string = DATE_TIME_FORMAT
// ) {
//   return ''
// }
