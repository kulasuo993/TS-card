// 对时间格式优化
const timestampPadStart = (str:any) => {
	// 必须转为字符串数字padStart方法
	str = String(str)
	return str.padStart(2, '0')
  }
  
  // 处理时间
  export const formatTimestamp = (ts:any) => {
	const date = new Date(Number(ts*1000))
  
	const YYYY = timestampPadStart(date.getFullYear())
	const MM = timestampPadStart(date.getMonth() + 1)
	const DD = timestampPadStart(date.getDate())
  
	const hh = timestampPadStart(date.getHours())
	const mm = timestampPadStart(date.getMinutes())
	// const ss = timestampPadStart(date.getSeconds())
	// return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`
	return `${YYYY}/${MM}/${DD} ${hh}:${mm}`
  }
  
  