import { createLogger, format, transports } from 'winston'

export const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'info.log'
    })
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `[${timestamp}] ${level}: ${message}`
    })
  )
})
