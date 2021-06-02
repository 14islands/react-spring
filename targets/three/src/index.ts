import { applyProps, addEffect, invalidate } from '@react-three/fiber'
import { Globals } from '@react-spring/core'
import { createStringInterpolator, colors } from '@react-spring/shared'
import { createHost } from '@react-spring/animated'
// import { FrameLoop } from './FrameLoop'
import { primitives } from './primitives'
import { WithAnimated } from './animated'

let nextFrame: Function | undefined = undefined

// Let r3f drive the frameloop.
// const frameLoop = new FrameLoop(() => invalidate())
addEffect(() => {
  // frameLoop.advance()
  if (nextFrame) nextFrame()
  return true // Never stop.
})

Globals.assign({
  createStringInterpolator,
  colors,
  // @ts-ignore
  // frameLoop,
  requestAnimationFrame: cb => (nextFrame = cb),
})

const host = createHost(primitives, {
  applyAnimatedValues: applyProps,
})

export const animated = host.animated as WithAnimated
export { animated as a }

export * from './animated'
export * from '@react-spring/core'
