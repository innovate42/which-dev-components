// @flow
import * as React from "react"
import classes from "./Skeleton.module.less"

type Props = {
  width: string,
  height: string
}

export function Skeleton({ width = "auto", height = "auto" }: Props) {
  return <span className={`${classes.root} ${classes.pulse} ${classes.className}`} style={{ width: width, height: height }}></span>
}
